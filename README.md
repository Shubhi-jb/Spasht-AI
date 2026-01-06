

## 🎯 Spasht AI

Millions unknowingly sign contracts with hidden predatory clauses, fees, and invasive terms. Traditional tools only summarize—they don't protect. Spasht AI actively warns users about toxic clauses before they sign, making legal protection accessible for everyone, including non-literate and vernacular users.

---

## 💡 Solution

Spasht AI actively scans legal documents and warns users about hidden risks before they sign.

**Key Points:**
- Uses Gemini 2.5 Flash for direct image-to-reasoning (no OCR errors)
- Delivers spoken warnings in Bazaar Hindi for non-literate users
- Provides instant 0-100 risk score with highlighted toxic clauses
- Zero-trace privacy: documents processed in-memory and deleted immediately
- Detects financial traps, privacy violations, and unfair legal terms

---

## ✨ Key Features

**Native Multimodal Layout Understanding**
- Analyzes document images directly without OCR conversion
- Identifies fine print in complex footers and blurry photos

**The "Scam Score" Gauge**
- Real-time 0-100 risk metric with color-coded warnings
- Instant visual judgment replacing 30 pages of confusion

**Toxic Clause Hunter**
- Financial: Hidden interest rates, predatory fees
- Privacy: Contact scraping, gallery access permissions
- Legal: One-sided clauses, unfair arbitration

**"Bazaar Hindi" Audible Interventions**
- Spoken warnings using Google Cloud Text-to-Speech
- Accessible for non-literate and regional language users

**Zero-Trace Privacy Architecture**
- In-memory processing only
- No cloud storage or data retention

---

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 16 or higher)
  - Check version: `node --version`
  - Download from: [nodejs.org](https://nodejs.org/)

- **npm** (comes with Node.js)
  - Check version: `npm --version`

- **Gemini API Key**
  - Get free key from: [Google AI Studio](https://ai.google.dev/)
  - Sign in with Google account
  - Create new API key in dashboard

### Step-by-Step Installation

**1. Clone the Repository**

```bash
git clone https://github.com/Aksharayadav/Spasht-AI.git
cd Spasht-AI
```

**2. Install Dependencies**

```bash
npm install
```

This will install all required packages:
- React (UI framework)
- TypeScript (type safety)
- Vite (development server)
- Google Generative AI SDK (Gemini integration)
- Additional UI libraries

**3. Configure Environment Variables**

Create a `.env.local` file in the root directory:

**Option A: Using command line**
```bash
touch .env.local
```

**Option B: Manual creation**
- Create a new file named `.env.local` in the project root
- Make sure the filename is exactly `.env.local` (not `.env` or `env.local`)

Add your API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

**Important Notes:**
- Replace `your_actual_api_key_here` with your actual Gemini API key
- Do NOT commit this file to Git (already in `.gitignore`)
- Keep this key private and secure
- Without this key, the app will not function

**4. Start Development Server**

```bash
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**5. Open in Browser**

Navigate to: `http://localhost:5173`

The app should load successfully. If you see errors, check:
- API key is correctly set in `.env.local`
- All dependencies installed without errors
- Port 5173 is not already in use



---

## 🌐 Deployment

**Current Deployment:** [spasht-ai.netlify.app](https://spasht-ai.netlify.app/)


## 📁 Project Structure

```
Spasht-AI/
│
├── App.tsx                       
│   └── Main application component
│   └── Manages navigation and state
│   └── Routes between upload and results pages
│
├── index.tsx                     
│   └── Application entry point
│   └── Renders root App component
│   └── Mounts React app to DOM
│
├── index.html                    
│   └── Base HTML template
│   └── Contains root div element
│   └── Loads JavaScript bundle
│
├── types.ts                      
│   └── TypeScript type definitions
│   └── AnalysisResult interface:
│       • riskScore: number (0-100)
│       • financialRisks: string[]
│       • privacyRisks: string[]
│       • legalRisks: string[]
│       • summary: string
│
├── package.json                  
│   └── Project metadata
│   └── Dependencies list
│   └── NPM scripts (dev, build, preview)
│   └── Version information
│
├── tsconfig.json                 
│   └── TypeScript compiler configuration
│   └── Type checking rules
│   └── Module resolution settings
│
├── vite.config.ts                
│   └── Vite build tool configuration
│   └── Development server settings
│   └── Build optimization options
│
├── metadata.json                 
│   └── Application metadata
│   └── Project configuration
│
├── env.download                  
│   └── Environment variable template
│   └── Example for API key setup
│
└── gitignore.txt                 
    └── Git ignore patterns
    └── Excludes node_modules, .env.local, dist
```




---

**Built with Google AI | Protecting users from hidden legal traps**
