# NatiNest Form Deployment

## Architecture
- Frontend: React + Vite + TypeScript in `artifacts/natinest`.
- Form page: `src/pages/Membership.tsx`.
- Production API: Vercel serverless function at `api/reservations.ts`.
- Storage/email service: Google Apps Script Web App using `google-apps-script.gs`.
- Google Sheet tab: `Reservations`.

## Required Google Setup
1. Create or open the Google Sheet that should receive reservations.
2. Copy its spreadsheet ID from the URL.
3. In Apps Script, paste the contents of `../../google-apps-script.gs`.
4. Set `SHEET_ID` to your spreadsheet ID if it changes.
5. Run `setup()` once from Apps Script to create the headers.
6. Deploy Apps Script as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copy the `/exec` Web App URL.

## Required Environment Variables
- `RESERVATION_WEBHOOK_URL`: Google Apps Script Web App `/exec` URL. Set this in Vercel project environment variables.
- `PORT`: required by this Vite config for local/Replit runs, for example `5173`.
- `BASE_PATH`: required by this Vite config, usually `/`.
- `VITE_RESERVATION_ENDPOINT`: optional. Keep `/api/reservations` for Vercel.

## Gmail / Email Setup
- Apps Script uses `MailApp.sendEmail`.
- The Google account that deploys the Apps Script must authorize spreadsheet access and email sending.
- Owner notification recipients are configured in `OWNER_EMAILS` inside `google-apps-script.gs`.

## Vercel Deployment
1. Set project root to `artifacts/natinest`.
2. Build command: `pnpm run build`.
3. Output directory: `dist/public`.
4. Add `RESERVATION_WEBHOOK_URL`, `PORT`, and `BASE_PATH` in Vercel environment variables.
5. Deploy.

## Replit Deployment
- Replit static hosting alone is not enough because the frontend now posts to `/api/reservations`.
- Use Vercel for the included serverless function, or add an equivalent Node route in Replit that proxies to the Apps Script URL stored server-side.
