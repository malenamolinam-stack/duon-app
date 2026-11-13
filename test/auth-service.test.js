import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAuthService } from '../src/storage/auth-service.js';
import { createFakeSupabase } from './support/fake-supabase.js';

// Break: sendSignInLink stops asking for a magic link, or sends the wrong redirect target.
test('sendSignInLink asks Supabase for a magic link that returns to this page', async () => {
  const fake = createFakeSupabase();
  const { sendSignInLink } = createAuthService(fake, () => 'https://duon.example/app/');

  await sendSignInLink('ana@example.com');

  assert.deepEqual(fake.calls.signInWithOtp, [
    {
      email: 'ana@example.com',
      options: { emailRedirectTo: 'https://duon.example/app/', shouldCreateUser: true },
    },
  ]);
});

// Break: a refused sign-in link is reported as success (null) instead of its error.
test('sendSignInLink returns the error when Supabase refuses the request', async () => {
  const providerError = { message: 'email rate limit exceeded' };
  const fake = createFakeSupabase({ signInResult: { error: providerError } });
  const { sendSignInLink } = createAuthService(fake, () => 'https://duon.example/app/');

  assert.equal(await sendSignInLink('ana@example.com'), providerError);
});

// Break: onSignedIn stops handing over the user, or hands over a session with no user.
test('onSignedIn calls back with the user once a session has one', () => {
  const fake = createFakeSupabase();
  const { onSignedIn } = createAuthService(fake, () => 'https://duon.example/app/');
  const seen = [];
  onSignedIn((user) => seen.push(user));

  fake.emitAuthChange('SIGNED_IN', { user: { id: 'u1' } });
  fake.emitAuthChange('SIGNED_OUT', null);

  assert.deepEqual(seen, [{ id: 'u1' }]);
});

// Break: signOut does not reach Supabase, so the session survives the button press.
test('signOut ends the Supabase session', async () => {
  const fake = createFakeSupabase();
  const { signOut } = createAuthService(fake, () => 'https://duon.example/app/');

  await signOut();

  assert.equal(fake.calls.signOut, 1);
});

// Break: deleteMyData calls a different function, or drops the error from the server.
test('deleteMyData calls delete_my_data and returns its error', async () => {
  const providerError = { message: 'permission denied' };
  const fake = createFakeSupabase({ rpcResult: { error: providerError } });
  const { deleteMyData } = createAuthService(fake, () => 'https://duon.example/app/');

  assert.equal(await deleteMyData(), providerError);
  assert.deepEqual(fake.calls.rpc, ['delete_my_data']);
});
