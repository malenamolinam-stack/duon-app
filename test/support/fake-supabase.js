// In-memory stand-in for the Supabase client at the network boundary.
// It records each call so tests can assert what the app asked for.
export function createFakeSupabase({ signInResult = { error: null } } = {}) {
  const calls = { signInWithOtp: [] };
  return {
    calls,
    auth: {
      async signInWithOtp(args) {
        calls.signInWithOtp.push(args);
        return signInResult;
      },
    },
  };
}
