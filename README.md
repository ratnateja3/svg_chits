# Shri Vijaya Ganapathi Chit Fund Pvt Ltd

Marketing website for Shri Vijaya Ganapathi Chit Fund Pvt Ltd, Shamshabad, Hyderabad. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Environment Variables

Configure the following variables in `.env.local` for development or in your Vercel project settings:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g. `http://localhost:3000` or production URL). |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Yes (for forms) | Hosted form provider endpoint URL (e.g. Formspree, Formkeep, Web3Forms) where enquiry form submissions are delivered. Form notifications arrive at the company inbox configured in the provider's dashboard. |
| `NEXT_PUBLIC_SHEET_ENDPOINT` | Optional | Google Apps Script Web App URL for receiving an optional, non-blocking parallel spreadsheet copy of enquiries into Google Sheets. See `docs/enquiry-spreadsheet-setup.md` for complete setup guide. |
| `SITE_INDEXABLE` | Optional | Set to `true` to allow search engine indexing in production. Defaults to `false`. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`). |

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```


