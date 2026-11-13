export const strings = {
  es: {
    title: 'Entra a DU·ON',
    intro: 'Escribe tu correo y te enviaremos un enlace para entrar. No necesitas contraseña.',
    emailLabel: 'Correo electrónico',
    send: 'Enviar enlace',
    sent: 'Revisa tu correo. Abre el enlace en este mismo navegador.',
    invalidEmail: 'Escribe un correo válido.',
    error: 'No pudimos enviar el enlace. Inténtalo de nuevo.',
    signedIn: 'Entraste como',
    signOut: 'Salir',
  },
  en: {
    title: 'Sign in to DU·ON',
    intro: 'Enter your email and we will send you a link to sign in. No password needed.',
    emailLabel: 'Email address',
    send: 'Send link',
    sent: 'Check your inbox. Open the link in this same browser.',
    invalidEmail: 'Enter a valid email address.',
    error: 'We could not send the link. Please try again.',
    signedIn: 'Signed in as',
    signOut: 'Sign out',
  },
};

// Picks the language from the browser, defaulting to Spanish.
export function currentStrings() {
  const lang = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  return strings[lang];
}
