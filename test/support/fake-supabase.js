// In-memory stand-in for the Supabase client at the network boundary.
// It records each call so tests can assert what the app asked for.
export function createFakeSupabase({
  signInResult = { error: null },
  rpcResult = { error: null },
} = {}) {
  const calls = { signInWithOtp: [], signOut: 0, rpc: [] };
  const listeners = [];
  return {
    calls,
    // Lets a test play the part of Supabase delivering a session change.
    emitAuthChange(event, session) {
      for (const listener of listeners) listener(event, session);
    },
    auth: {
      async signInWithOtp(args) {
        calls.signInWithOtp.push(args);
        return signInResult;
      },
      onAuthStateChange(listener) {
        listeners.push(listener);
      },
      async signOut() {
        calls.signOut += 1;
      },
    },
    async rpc(name) {
      calls.rpc.push(name);
      return rpcResult;
    },
  };
}
