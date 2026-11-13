import { sendSignInLink } from '../storage/auth.js';
import { currentStrings } from '../i18n/strings.js';

// Renders the sign-in form into `container`.
export function renderSignIn(container) {
  const t = currentStrings();
  container.innerHTML = `
    <h1>${t.title}</h1>
    <p>${t.intro}</p>
    <form id="sign-in-form" novalidate>
      <label for="email">${t.emailLabel}</label>
      <input id="email" type="email" autocomplete="email" required>
      <button type="submit">${t.send}</button>
      <p id="sign-in-message" role="status" aria-live="polite"></p>
    </form>
  `;

  const form = container.querySelector('#sign-in-form');
  const input = container.querySelector('#email');
  const message = container.querySelector('#sign-in-message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = input.value.trim();
    if (!input.checkValidity() || !email) {
      message.textContent = t.invalidEmail;
      return;
    }
    const error = await sendSignInLink(email);
    if (error) console.error('Sign-in link failed:', error);
    message.textContent = error ? t.error : t.sent;
  });
}
