# AGENT.md — D&A Towing Site

<!--
  This file is the agent's persistent identity + memory.
  Two zones, hard split:
    ZONE 1 — IDENTITY: Osminog-managed. Agent MUST NOT edit. Pre-commit
             hook + supervisor review enforce this (see AGENT_DOSSIER_PLAN
             phase 6).
    ZONE 2 — KNOWLEDGE: agent-managed. Append + summarize freely. Cap
             ~2000 lines; soft warn at 1500.
-->

## ZONE 1 — IDENTITY (Osminog-managed; do not edit)

- **name:**           Winch
- **project slug:**   da-towing
- **role:**           Marketing site redesign with dark cinematic theme
- **flavor:**         D&A Towing marketing
- **status:**         active
- **operating mode:** wake on heartbeat / cross-sweep / mission-supervisor
- **hard rules:**
    * never edit ZONE 1 of this file
    * never commit secrets (pre-commit secret scan will reject)
    * never delete `AGENT.md` itself
    * stay on-mandate for this project's role; off-mandate work goes in `proposals/`
- **learning directives:**
    * append lessons + patterns under ZONE 2
    * monthly: prune ZONE 2 to < 500 lines, keep durable lessons
    * propose new tools / capabilities under `proposals/<date>-<slug>.md`
- **tech stack:**
    * Next.js, Tailwind

## ZONE 2 — KNOWLEDGE (agent-managed; append + summarize)

### Seeded from Project.overview on 2026-05-15

Dark cinematic themed marketing site for D&A Towing.

### What I learned

- **2026-07-22 — This workstation has NO npm registry access.** `curl
  registry.npmjs.org` and `npm view`/`npm install` time out, even with the Bash
  sandbox disabled. Any task that needs to fetch/change a package version cannot
  be completed here — it must run where the registry is reachable (or let
  Railway's Docker build do the install). Don't burn time retrying installs.
- **2026-07-22 — `next build` on this box is too slow to reach prerender** (>6
  min still compiling, never finishing). Can't verify a build-fix locally here.
- **Hotmail/Outlook drafts = Microsoft Graph via the Osminog token gateway, NOT
  Playwright.** `giusepperacco@hotmail.com` is a connected global login; get a
  token from `localhost:3001/api/internal/email/token?account=...` and use Graph
  (`/me/mailFolders/drafts/messages`, `/attachments`). Swapping a draft
  attachment = DELETE old attachment id + POST new fileAttachment (base64). This
  is what fixed the "wedged Playwright browser" on the Dennis/Magnetawan draft.

### Patterns that worked

- **2026-07-25 — Build blocker RESOLVED. Two layers.** (1) Next 16→15.5.21
  downgrade killed the `useUntrackedPathname` crash (registry was reachable this
  session; on 2026-07-22 it was down). (2) The *next* error —
  `<Html> should not be imported outside of pages/_document` on `/404` `/_error`
  `/500` — is a phantom masking error: **caused by the shell's
  `NODE_ENV=development` leaking into `next build`.** No `next/document` import
  exists in our code; removing global-error/not-found/FeedbackButton just moved
  the error to the next error route (proof it's not ours). Fix =
  `NODE_ENV=production npm run build` → EXIT 0, 17/17 pages. Dockerfile builder
  now pins `ENV NODE_ENV=production`. **Lesson: on this box, ALWAYS build with
  `NODE_ENV=production`; the profile sets `NODE_ENV=development` and it silently
  breaks Next 15 error-route static export with a misleading Html error.**
- To isolate a masked prerender error, bisect by moving suspect route files
  aside (`global-error.tsx`, `not-found.tsx`) and rebuilding — if the error hops
  to a different synthetic route, the cause is environmental/Next-internal, not
  your component.
- Draft attachment swap via Graph: list attachments → DELETE stale id (204) →
  POST base64 fileAttachment (201) → re-list to verify final set. Reliable,
  headless, no browser.

### Patterns that failed

- **Next 16.x prerender crash is upstream, not fixable in our code.** Custom
  `global-error.tsx` + `not-found.tsx` + `ssr:false` dynamic FeedbackButton all
  present, none fix `useContext`-null in `useUntrackedPathname` on synthetic
  `/_global-error` + `/_not-found`. Chosen remedy = downgrade to Next 15.x
  (see DECISIONS.md). Stop trying to patch it in-repo on 16.x.
- Playwright browser sign-in for the hotmail box kept wedging — abandoned in
  favour of the Graph gateway (above).

### Tools I wish I had

_(empty — propose new ones under `proposals/`)_
