// Auth calls against any Supabase-shaped client. The real client is wired in auth.js;
// tests pass a fake, so this module never loads the Supabase SDK itself.
export function createAuthService(client, getPageUrl = () => window.location.origin + window.location.pathname) {
  // Sends a magic link to the address. Returns an error object, or null on success.
  async function sendSignInLink(email) {
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getPageUrl(),
        shouldCreateUser: true,
      },
    });
    return error;
  }

  // Calls back with the signed-in user, including after the link is opened.
  function onSignedIn(callback) {
    client.auth.onAuthStateChange((_event, session) => {
      if (session?.user) callback(session.user);
    });
  }

  async function signOut() {
    await client.auth.signOut();
  }

  // Removes the profile and everything linked to it (see delete_my_data in the database).
  // The sign-in account itself is removed separately by a server function, still to build.
  async function deleteMyData() {
    const { error } = await client.rpc('delete_my_data');
    return error;
  }

  return { sendSignInLink, onSignedIn, signOut, deleteMyData };
}
