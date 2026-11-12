# DU·ON

Activity routines for a person and their dog: walking, jogging, and running together, adapted to both members of the pair.

Bilingual (Spanish and English) web app (PWA). Currently in prototype and validation stage.

**Visual and behaviour reference:** the V17 prototype is in [`reference/DUON_Pruebas_V17.html`](reference/DUON_Pruebas_V17.html). It is the reference for screens and behaviour, not production code. The original is also in Google Drive (`DU·ON > 02 Prototipos y web > DUON_Pruebas_V17.html`).

## Decisions (v1)

### Product
- Activity routines, not behaviour training.
- Web app (PWA), installable from the browser.
- Spanish and English at launch, with full parity on every screen.
- Free for all validation users. Willingness to pay is asked in the end-of-session survey, not charged.

### Scope
- **In v1:**
  - Profiles for the person and the dog. Minimal onboarding: dog's name, size, and age; person's name and fitness level.
  - Rules-based routine plans, generated from fixed rules that a veterinary or canine-exercise reviewer approves.
  - Activity history with manual logging (duration, distance, notes).
  - Two ratings after each session: the person's effort (1–5) and the dog's comfort (1–5). A low comfort rating automatically steps the next plan down one level.
  - The leash guide, shown before the first outing.
  - Internal, team-only research dashboard for reviewing responses.
- **Deferred:**
  - Real GPS tracking. Map, distance, and pace are entered by hand, and testers are told so.
  - Rewards, badges, and extra preferences.
  - Breed and life-stage fields, until the vet review.
  - The first guided walk and initial plan, until the vet has signed off.
  - Health history of any kind.

### Welfare
- Weather from a paid commercial licence. If data is missing or stale, the person must confirm conditions before starting.
- Heat thresholds, session-length limits, and progression values are set by the vet or canine-exercise reviewer. Until then they are not used with real users.
- Product principle: **welfare first, always**. Conservative recommendations, weather context, heat precautions, and specialist or veterinary review.

### Accounts and data
- Sign-in by email magic link.
- Data is kept while the account is active, plus 12 months, and deleted on request.
- Mexican data-protection requirements (LFPDPPP) are to be checked with a lawyer before launch.
- Survey responses are stored centrally. The team-only dashboard is the only place they are read.

### Validation
- Targets are written down before the pilot starts. Starting metrics: week-4 return rate, session completion, and willingness to pay. Thresholds are set by the team.

### Budget and vendors
- The MVP budget is re-estimated against this scope with Softrek. The reference budget (MXN 554,944 with IVA and 15% contingency) is no longer the basis.

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/screens/` | Screens of the app |
| `src/engine/` | Rules-based routine plans, step-down rule, weather check |
| `src/storage/` | Accounts, activity history, deletion on request |
| `src/i18n/` | Spanish and English strings |
| `docs/` | Vet-review questions, Softrek scope brief, open decisions |

## Status

Structure and decisions only. No application logic yet. The plan engine waits for the vet review.
