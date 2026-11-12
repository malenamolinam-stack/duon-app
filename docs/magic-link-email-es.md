# Magic-link email, Spanish version

Paste these into **Supabase dashboard → Authentication → Email Templates → Magic Link**.

Keep `{{ .ConfirmationURL }}` exactly as written. It is the sign-in link.

**Subject:** Tu enlace para entrar a DU·ON

**Body (HTML):**

```html
<h2>Entra a DU·ON</h2>
<p>Usa este enlace para entrar. Caduca pronto y solo se puede usar una vez.</p>
<p><a href="{{ .ConfirmationURL }}">Entrar a DU·ON</a></p>
<p>Si no pediste este correo, puedes ignorarlo.</p>
```

Note: the link works only in the browser where the sign-in was requested. If someone opens it on another device, they should request a new link.
