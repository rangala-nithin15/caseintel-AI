# caseintel-AI

CaseIntel AI is a decision-support tool built for police officers, investigators, and crime intelligence units working under the Karnataka State Police (KSP). It pulls together FIR records, suspect profiles, modus operandi patterns, and crime hotspot data into one interface, and uses Google Gemini to help officers query and summarize all of it in plain language.

This started as a hackathon prototype, so treat it as exactly that — a working proof of concept, not a production system.

## Why this exists

Police stations deal with a lot of unstructured paperwork: long FIRs, charge sheets, witness statements, suspect records scattered across different stations. Spotting a pattern across districts, or putting together a court-ready brief, usually means someone manually reading through all of it — which can eat up hours or even days.

CaseIntel AI tries to shrink that down by handling a few things automatically:

- **FIR summarization** — pull out the key facts, IPC/BNS sections, accused names, and evidence from a FIR in seconds instead of reading the whole document.
- **Cross-district matching** — surface modus operandi patterns that link crimes across different police stations, which is easy to miss when each station only sees its own records.
- **Voice queries and evidence scanning** — officers in the field can ask questions by voice or scan a document/photo instead of typing everything out.
- **Court-ready report drafts** — auto-format investigation summaries to match Karnataka High Court conventions, so the first draft of a brief doesn't start from a blank page.

## What it can do

**AI Investigation Assistant**
A natural-language interface that understands the context of criminal procedure (IPC, CrPC, BNS) and searches across the FIR database, suspect records, and intelligence logs.

**FIR & suspect matching**
Search by suspect alias, modus operandi ("bank OTP scam," "night burglary," etc.), vehicle number, or location. It cross-references fingerprints, prior arrests, and active warrants where available.

**Multi-modal FIR scanner**
Upload a scanned FIR PDF or a photo from the scene, and it pulls out the FIR number, incident date, station, sections, and suspect details automatically.

**Crime density & hotspot analytics**
District-level hotspot tracking (currently Bengaluru, Mysuru, Hubballi, Mangaluru, Davanagere) with a Low/Medium/High/Critical risk classification and trend charts over time.

**Tactical UI themes**
A few different visual themes depending on how and where it's used — Tactical Midnight, KSP Duty Gold, High Contrast Field, and Cyber Command. Works on desktop workstations as well as tablets and phones for officers on duty.

**Form-54 & brief generator**
One click to export a prosecution brief, charge sheet draft, or investigation timeline instead of formatting it by hand.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini API (`@google/genai`)
- **Data:** Structured JSON store for FIRs, wanted suspects, crime hotspots, and officer session logs
- **Build:** Vite (frontend) + esbuild (backend)

Nothing exotic here on purpose — the goal was to keep the stack simple enough to stand up quickly and not need a database server running alongside it.

## Getting started

### You'll need

- Node.js 18 or higher
- npm (or bun, if you prefer)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Setup

Clone the repo:
```bash
git clone https://github.com/rangala-nithin15/caseintel-AI.git
cd caseintel-ai
```

Install dependencies:
```bash
npm install
```

Add your API key. Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run it:
```bash
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the server and frontend together in dev mode on port 3000 |
| `npm run build` | Builds the client assets and bundles the server into `dist/server.cjs` |
| `npm run start` | Runs the compiled production build (`node dist/server.cjs`) |
| `npm run lint` | Runs the TypeScript checker |

## A note on the architecture

The Gemini API key never touches the browser — all AI calls go through the Express backend, which acts as a proxy. The frontend just talks to our own API routes, and the backend handles the actual Gemini requests server-side. Case data currently lives in a structured JSON store rather than a full database, which keeps the prototype easy to run anywhere without extra setup, though it's the first thing that would need to change for a real deployment (see below).

## Where this could go next

- Real-time integration with CCTNS (the national crime tracking system) instead of a standalone dataset
- Live ANPR camera feed integration for vehicle tracking
- Kannada voice support alongside English
- Moving off the local JSON store to a proper database for multi-station, concurrent use

## License & disclaimer

Built for demonstration and educational purposes as a prototype for the Karnataka State Police domain. Not an official KSP product, and not vetted for handling real case data.
