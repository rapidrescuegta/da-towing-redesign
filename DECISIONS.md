# D&A Towing Site — Locked Decisions & Durable Findings

## 2026-07-22 — Build blocker (Next 16 prerender crash) status + chosen path

**Symptom:** `next build` crashes prerendering the synthetic `/_global-error` +
`/_not-found` routes with `Cannot read properties of null (reading useContext)`
in `useUntrackedPathname`. Reproduces identically on classic-towing-redesign.

**Confirmed NOT our code:** the crash is inside Next's own synthetic-route
prerender, not our components. All three code-level mitigations are already in
the tree and do NOT fix it:
- custom `src/app/global-error.tsx` (owns its own html/body, no router hooks)
- custom `src/app/not-found.tsx` (plain, uses `Link` only)
- `FeedbackButtonClient` dynamic-imports FeedbackButton with `ssr:false`

**CHOSEN FIX (decision): downgrade this site to Next 15.x (React 19 stays).**
Option (a) from the next-step. It is the reliable, reversible path; 16.3 canary
is unproven and filing-and-waiting is what caused the 61-day stall.

**Why not executed yet — real environmental blocker (verified 2026-07-22):**
this workstation has NO outbound access to the npm registry — `curl
https://registry.npmjs.org/next` times out even with the Bash sandbox disabled,
and `npm view`/`npm install` hang. A version change can't be fetched here, and
`next build` on this box is too slow to even reach the prerender step to verify
a fix. So the downgrade must run where npm registry is reachable.

**Next action (needs network, then verify):**
1. In an environment with registry access: pin `next` to latest 15.x in
   package.json, `npm install` to regenerate package-lock, `npm run build`.
2. Confirm build is GREEN (no prerender crash).
3. Only then push the 4 local commits to origin/master (Railway auto-deploys on
   push — never push while build is red or Railway fails).

**Do NOT** push the 4 unpushed commits until the build is verified green.

**Also noted (unrelated to the crash, do not chase now):** Next warns the
workspace root was inferred as `/home/gracco` due to a stray
`/home/gracco/package-lock.json`. Setting `turbopack.root` to the project dir
silences it; left unchanged for now to avoid an unverifiable edit in a red build.
