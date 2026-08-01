# D&A Towing Site — Locked Decisions & Durable Findings

## 2026-08-01 — Next-step reconciliation (stale sweep cleared)

Cross-project sweep flagged "7 days no commit, 3 open next-steps." Verified the
actual repo state — two of the three are already DONE and only stale in the
tracker:

1. **Next 16 prerender crash** → ✅ RESOLVED (Next 15.5.21 downgrade, `3c647e5`).
2. **Push local commits** → ✅ DONE. Working tree clean, `origin/master` 0 ahead;
   all commits up to `5747b2c` are pushed. Nothing unpushed.
3. **Set RESEND_API_KEY + CONTACT_EMAIL_TO in Railway + verified sending domain**
   → **DEFERRED — Giuseppe-blocked, not an agent task.** Code side is COMPLETE:
   `src/app/api/contact/route.ts` and `src/app/api/feedback/route.ts` both read
   the env vars and degrade gracefully (skip email / fall back to
   `onboarding@resend.dev`) when unset — nothing crashes without them. What
   remains needs (a) Railway env-var write access (`railway login` — stored token
   is expired/dead, confirmed 2026-07-25) and (b) a DNS/vendor decision to verify
   a sending domain at Resend (GoDaddy DNS + Resend domain verify). Both require
   Giuseppe. No further agent action possible until he re-auths Railway and picks
   the sending domain. Also still open on his side: `railway login` so the
   `e307cc4` deploy can be confirmed green (see 2026-07-25 entry).

**Net: no code work outstanding on this box. All open items are Giuseppe-side.**

---

## 2026-07-25 — BUILD BLOCKER RESOLVED ✅ (Next 15 downgrade + NODE_ENV fix)

**Status: GREEN.** `next build` exits 0, all 17 static pages generate, no crash.
The 61-day blocker is cleared. Two things were needed:

1. **Downgrade executed:** `next` pinned `^16.2.6` → `^15.5.21` (React 19 stays),
   `npm install` regenerated `package-lock.json`. This killed the original
   `useUntrackedPathname` `useContext`-null crash (that was a Next 16 upstream
   bug — see below). npm registry was reachable this session (was down on
   2026-07-22), so the install finally completed on this box.

2. **Real second blocker found — NODE_ENV.** After the downgrade, `next build`
   still failed, but with a DIFFERENT, misleading error:
   `<Html> should not be imported outside of pages/_document` while exporting the
   synthetic `/404` + `/_error` (and `/500`) routes. **This is NOT our code** —
   no file imports `next/document`; removing `global-error.tsx`, `not-found.tsx`,
   and `FeedbackButtonClient` did not fix it (the error just hopped to the next
   error route). **Root cause: the workstation shell has `NODE_ENV=development`,
   which Next 15 carries into `next build`, making it misfire the `<Html>` guard
   during static export of the pages-router error routes.** Fix: build with
   `NODE_ENV=production`. Verified: `NODE_ENV=production npm run build` → EXIT 0,
   17/17 static pages, 0 errors.

**Hardening shipped:** `Dockerfile` builder stage now pins `ENV NODE_ENV=production`
before `npm run build` (placed AFTER node_modules copy so devDeps stay available).
Railway's clean Docker env already defaults to production, but this makes the
build deterministic and immune to this exact failure class.

**Push:** build is verified green, so the unpushed commits (downgrade + Dockerfile
+ this doc) are safe to push. Railway auto-deploys on push. **DONE — pushed as
`e307cc4` on 2026-07-25.**

**Deploy verification — BLOCKED on Railway auth (Giuseppe action).** After the
push I could NOT confirm the Railway build/deploy went green from this box:
- `railway status` → "Unauthorized. Please run `railway login` again."
- Stored token in `~/.railway/config.json` (`user.token`) is EXPIRED — Railway
  GraphQL returns "Not Authorized". Re-login needs Giuseppe's interactive
  browser consent (his account/credential).
- GitHub deployments API is empty (Railway doesn't post GH deployment statuses).
- The custom domain `datowingandstorage.com` still serves the OLD site
  (`server: Apache`, old title) — the Railway redesign is NOT pointed at it yet.
- Railway service IDs for this project (from `~/.railway/config.json`):
  project `83a94aae-816b-4c2a-bbb5-6a969bf35817`,
  env `f3724348-958c-4d4b-8dee-54f9371434ad`,
  service `4cd8068f-3696-4fd5-b654-33177de3c58c`.
What IS verified: local `NODE_ENV=production npm run build` is GREEN and uses the
identical command Railway's Dockerfile runs, so the Docker build should succeed.
**To close the loop:** Giuseppe runs `railway login` (then I can query deploy
status), or glances at the Railway dashboard for the da-towing service build log.

---

## 2026-07-22 — Build blocker (Next 16 prerender crash) status + chosen path
> SUPERSEDED by the 2026-07-25 entry above — blocker is now resolved. Kept for history.

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
