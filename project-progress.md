# NatiNest Project Progress

## Current Status
- Actual GitHub repository verified and cloned from `https://github.com/mcdmmc123-pixel/natinest-web-app`.
- Current `main` commit at inspection time: `45792991956fd250daf755c77fdaa9dcfd4ae0fb`.
- Repository architecture: pnpm monorepo with app in `artifacts/natinest`, shared libs under `lib`, Replit/Vite deployment config, and original image assets in `attached_assets`.

## Completed Tasks
- Located the "Secure My Spot" form in `artifacts/natinest/src/pages/Membership.tsx`.
- Confirmed the original form only logged values client-side and showed success.
- Added real form submission to `/api/reservations`.
- Added required-field validation, phone/email validation, message length limit, submit error state, submit loading state, and normalized payload fields.
- Added `submissionId` and `eggsPerWeek` to prevent duplicate/broken submissions and preserve all required owner email fields.
- Added Vercel serverless proxy in `artifacts/natinest/api/reservations.ts`.
- Added Google Apps Script implementation in `google-apps-script.gs`.
- Added setup/deployment docs in `artifacts/natinest/DEPLOYMENT.md`.
- Added environment example in `artifacts/natinest/.env.example`.
- Fixed Framer Motion `Variants` typing in page components so direct TypeScript checking passes with the installed dependency versions.
- Ran direct TypeScript check: `node_modules/.bin/tsc.CMD -p artifacts/natinest/tsconfig.json --noEmit` passed.
- Enabled Windows x64 native package overrides locally in `pnpm-workspace.yaml` so the Vite dev server can run on this Windows machine.
- Updated `pnpm-lock.yaml` with Windows-native dev dependencies using `npx pnpm install --no-frozen-lockfile --ignore-scripts`.
- Started local Vite dev server at `http://localhost:5174/` and verified HTTP 200.
- Tested deployed `https://natinest.in/api/reservations`; it returned HTTP 404, which means Vercel did not deploy the app-local serverless function for the current project root configuration.
- Added duplicate root-level `api/reservations.ts` so `/api/reservations` works when Vercel project root is the repository root.
- After remote changes, confirmed app-local `artifacts/natinest/api/reservations.ts` was missing while Vercel is building with `artifacts/natinest` as project root. Re-added the app-local API route.

## Pending Tasks
- Run production build on Linux/Replit/Vercel environment.
- Deploy the updated Google Apps Script and copy the `/exec` Web App URL.
- Set `RESERVATION_WEBHOOK_URL` in Vercel.
- Deploy `artifacts/natinest` with `dist/public` output.

## Files Modified
- `artifacts/natinest/src/pages/Membership.tsx`
- `artifacts/natinest/src/pages/Home.tsx`
- `artifacts/natinest/src/pages/Story.tsx`
- `artifacts/natinest/src/pages/HowItWorks.tsx`
- `artifacts/natinest/api/reservations.ts`
- `api/reservations.ts`
- `artifacts/natinest/.env.example`
- `artifacts/natinest/DEPLOYMENT.md`
- `google-apps-script.gs`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `project-progress.md`

## Environment Variables Required
- `RESERVATION_WEBHOOK_URL`: Google Apps Script Web App `/exec` URL.
- `PORT`: required by repo Vite config, example `5173`.
- `BASE_PATH`: required by repo Vite config, usually `/`.
- `VITE_RESERVATION_ENDPOINT`: optional; defaults to `/api/reservations`.

## APIs / Services Connected
- Frontend posts to same-origin `/api/reservations`.
- Serverless function proxies to Google Apps Script.
- Apps Script writes to the `Reservations` Google Sheet tab and emails `k.shreyasgowdru@gmail.com` and `gangadharar739@gmail.com`.

## Errors Encountered
- Initial local workspace was not a Git repository and only had a source dump.
- Correct GitHub repo was provided later and cloned into `.repo-check/natinest-web-app`.
- `pnpm` was not installed globally; used `npx pnpm`.
- Root `pnpm install --frozen-lockfile` fails on Windows because the root `preinstall` script calls `sh`, which is unavailable in PowerShell/cmd.
- Direct Vite build on Windows fails because `pnpm-workspace.yaml` intentionally overrides `rollup>@rollup/rollup-win32-x64-msvc` to `-`; this repo appears tuned for Linux/Replit builds. TypeScript verification passed.
- Fixed local Windows hosting by allowing the Windows x64 native packages for Rollup, esbuild, Lightning CSS, and Tailwind Oxide.
- Live production form failure found: `/api/reservations` returned 404 before the root-level API route was added.

## Deployment Status
- Implementation is present in the cloned actual repo.
- TypeScript verification passed.
- Localhost dev server was verified at `http://localhost:5174/`.
- New root API route needs to be committed, pushed, and redeployed on Vercel.
- Production build should be run on Linux/Replit/Vercel because Windows Rollup native optional dependency is intentionally excluded by workspace overrides.

## Exact Next Step
- Commit/push restored `artifacts/natinest/api/reservations.ts`, redeploy Vercel, then retest `https://natinest.in/api/reservations`.
