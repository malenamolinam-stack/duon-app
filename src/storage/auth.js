import { supabase } from './client.js';

// Sends a magic link to the address. Returns an error object, or null on success.
export async function sendSignInLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
      shouldCreateUser: true,
    },
  });
  return error;
}

// Calls back with the signed-in user, including after the link is opened.
export function onSignedIn(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) callback(session.user);
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Removes the profile and everything linked to it (see delete_my_data in the database).
// The sign-in account itself is removed separately by a server function, still to build.
export async function deleteMyData() {
  const { error } = await supabase.rpc('delete_my_data');
  return error;
}
