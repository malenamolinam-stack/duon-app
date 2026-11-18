## Agent skills

### Issue tracker

GitHub Issues in `malenamolinam-stack/duon-app`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default seven labels: bug, enhancement, needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context. See `docs/agents/domain.md`.

### External peers

Auto mode: uses the installed Claude CLI, default model, effort high. See `docs/agents/cross-model.json`.

## Rutina de cada mañana (8:00–11:00)

Al empezar cada sesión de trabajo en DU·ON, antes de cualquier otra cosa:

1. Decir qué programas hay que abrir para las tareas de hoy (Terminal, navegador, iPhone, Xcode…) y cuáles no hacen falta.
2. Leer `docs/bitacora.md` (lo que quedó anotado ayer). Si hoy se va a programar, guardar el estado con git (`git status`, commit) antes de pedir cambios.
3. Cuando algo se pueda probar, probarlo: la dueña lo prueba en su iPhone y se corre `npm test`. Si funciona, commit.
4. Al terminar, anotar en `docs/bitacora.md`: qué se hizo hoy, qué quedó pendiente y qué toca mañana.

Hablar en español sencillo. Los comandos van cada uno en su propio bloque `bash`.
