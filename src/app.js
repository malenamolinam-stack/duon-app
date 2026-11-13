import { renderSignIn } from './screens/sign-in.js';
import { onSignedIn, signOut } from './storage/auth.js';
import { supabase } from './storage/client.js';
import { currentStrings } from './i18n/strings.js';

const app = document.getElementById('app');

// Shows a short "you are signed in" screen with a sign-out button.
function showSignedIn(user) {
  const t = currentStrings();
  app.replaceChildren();

  const text = document.createElement('p');
  text.textContent = `${t.signedIn} ${user.email}`;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = t.signOut;
  button.addEventListener('click', async () => {
    await signOut();
    renderSignIn(app);
  });

  app.append(text, button);
}

async function start() {
  // Check for an existing session first, including one just created from the emailed link.
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    showSignedIn(data.session.user);
  } else {
    renderSignIn(app);
  }

  // Later changes, such as opening the link in this tab after the page is already open.
  onSignedIn(showSignedIn);
}

start();
