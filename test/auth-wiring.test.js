import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './support/fake-supabase.js';

// The real client.js pulls the Supabase SDK from esm.sh, which Node cannot load here.
// Swap it for the fake before auth.js is imported, so the app's real wiring runs.
const fake = createFakeSupabase();
mock.module('../src/storage/client.js', { namedExports: { supabase: fake } });
globalThis.window = { location: { origin: 'https://duon.example', pathname: '/app/' } };
const { sendSignInLink, signOut, deleteMyData } = await import('../src/storage/auth.js');

// Break: auth.js binds the auth service to the wrong client, so the app never reaches Supabase.
test('the app sign-in call reaches the Supabase client it is bound to', async () => {
  await sendSignInLink('ana@example.com');

  assert.deepEqual(fake.calls.signInWithOtp, [
    {
      email: 'ana@example.com',
      options: { emailRedirectTo: 'https://duon.example/app/', shouldCreateUser: true },
    },
  ]);
});

// Break: the exported sign-out or delete-data function is not the one bound to the client.
test('the app sign-out and delete-data calls reach the Supabase client', async () => {
  await signOut();
  await deleteMyData();

  assert.equal(fake.calls.signOut, 1);
  assert.deepEqual(fake.calls.rpc, ['delete_my_data']);
});
