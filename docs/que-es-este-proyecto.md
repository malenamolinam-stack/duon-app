# DU·ON en 10 líneas (para quien nunca ha programado)

Explicación escrita por Claude Code el 2026-11-18 (Día 2). Revisada contra las carpetas reales.

1. DU·ON es una app para caminar, trotar o correr con tu perro, con un plan que cuida a los dos. Por ahora es un prototipo para probar la idea.
2. Es una página web que se podrá instalar en el celular (iPhone o Android) desde el navegador, sin pasar por la App Store ni por Google Play. *(Todavía no se puede instalar: eso es una tarea de más adelante en el plan, «Que se pueda instalar».)*
3. `index.html` es la puerta de entrada: lo primero que abre el navegador. Desde ahí carga el resto.
4. La carpeta `src/` guarda las instrucciones de la app, repartidas en cajones según su tarea.
5. `src/screens/` tiene las pantallas. Hoy existe una: la de entrar con tu correo (`sign-in.js`).
6. Para entrar no hay contraseña: la app te manda un enlace al correo. De eso se encarga Supabase, un servicio externo que guarda las cuentas y los datos (`src/storage/`).
7. `src/i18n/` tiene todos los textos en español y en inglés. Un revisor comprueba que no falte ninguno en ninguno de los dos idiomas.
8. `src/engine/` será el «cerebro» que arma los planes, pero está vacío a propósito: espera que el veterinario apruebe las reglas.
9. La carpeta `test/` tiene 11 pruebas automáticas. `npm test` las ejecuta y avisa si algo se rompió (hoy: 0 fallos).
10. `docs/` es la libreta del proyecto: la bitácora, el problema, la competencia, las preguntas al veterinario. `reference/` guarda el prototipo V17, que sirve de modelo para las pantallas.
