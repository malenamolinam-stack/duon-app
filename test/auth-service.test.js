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
