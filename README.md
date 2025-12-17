# 🏭 Van Dyk Recycling Solutions – Staging Website (`stagevdrs`)

**Environment**: Staging  
**Framework**: React 18 + TypeScript + Vite  
**Hosted**: `stagevdrs.vercel.app`

This repository contains the **staging version** of the Van Dyk Recycling Solutions website. It is used for feature development, QA, and client review before changes are promoted to the main production repository.

---

## 🔧 Tech Stack

- **React 18** with function components & hooks  
- **TypeScript** for type‑safe development  
- **Vite** for dev server and production builds  
- **Tailwind CSS** for styling  
- **Framer Motion** for animations  
- **React Router DOM** for client‑side routing  
- **Vercel** for staging deployments  

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js **18+**
- npm (comes with Node)

### 2. Install & Run

```bash
git clone https://github.com/AjithVanDyk/stagevdrs.git
cd stagevdrs

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### 3. Build & Preview

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

### 4. Quality Checks

```bash
# Lint (ESLint)
npm run lint

# TypeScript type‑check
npm run type-check
```

---

## 📁 Project Structure (High Level)

```text
.
├─ public/                # Static assets (images, favicon, sitemap, manifest, SW)
├─ src/
│  ├─ components/         # Shared UI components (Navbar, Footer, Cards, Modals, etc.)
│  ├─ pages/              # Route-level pages (Home, Solutions, Equipment, Support, etc.)
│  ├─ config/             # Image assignments, translations, SEO helpers
│  ├─ data/               # Structured data (equipment, solutions, comparison tables)
│  ├─ hooks/              # Custom hooks (i18n, animations, language navigation)
│  ├─ utils/              # Analytics, performance monitor, accessibility, forms, etc.
│  ├─ contexts/           # `LanguageContext` and related providers
│  ├─ index.css           # Tailwind base + global styles
│  └─ main.tsx / App.tsx  # App entry and routing
├─ api/                   # Vercel serverless functions (forms, newsletter, careers, etc.)
├─ scripts/               # Build‑time verification scripts (images, post‑build checks)
├─ vite.config.ts         # Vite configuration
├─ tailwind.config.js     # Tailwind configuration
└─ vercel.json            # Vercel routing + security headers
```

---

## 🌐 Key Features

- **Responsive marketing site** for Van Dyk Recycling Solutions
- **Equipment & Solutions pages** with structured data and SEO metadata
- **AI Waste Analysis / EPR Compliance Map**  
  - Interactive map of US, Canada, and Mexico  
  - Tooltips, zoom, and pan (via `react-simple-maps`)  
- **Dynamic Homepage CTAs**  
  - Buttons driven by `trackButtonClick` / `getMostClickedButtons` analytics  
  - Surfaces the most‑clicked routes for users
- **Careers & Job Application**  
  - In‑site application form routed to `achirca@vdrs.com` via API
- **Contact & Quote forms** with validation and serverless back‑end handlers
- **Internationalization (i18n)**  
  - Custom `useTranslation` hook with `LanguageContext` for EN/FR/ES
- **Accessibility & Performance**  
  - Accessibility utilities, lazy‑loaded images, preloading of critical assets  
  - Vercel analytics and Speed Insights integrated in `App.tsx`

---

## 🔐 Security & Headers

- Strict **Content Security Policy (CSP)** and security headers defined in `vercel.json`
- HTTPS enforced via `Strict-Transport-Security`
- `Referrer-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Permissions-Policy` configured

---

## 🧪 Staging Workflow

Typical flow for working in this repo:

1. **Create a branch** from `main` for each feature/fix.
2. Develop locally and verify:
   - `npm run dev` (no console errors)
   - `npm run lint`
   - `npm run type-check`
   - `npm run build`
3. **Push to `main`** when approved; Vercel auto‑deploys to the staging URL.
4. Validate the staging site (`stagevdrs.vercel.app`) before mirroring changes into the main production repo (`vdrsnewv1`).

---

## 📎 Notes

- This environment is **staging only** – do not use production credentials or live customer data.
- Non‑runtime docs, audit scripts, and historical reports are kept under `bin/` locally to keep the root clean; they are **not** required to run or build the app.

---

## 📞 Contact

For questions about this staging project:

- **Developer**: Ajith Srikanth  
- **Organization**: Van Dyk Recycling Solutions  
- **Primary Repo**: [`AjithVanDyk/stagevdrs`](https://github.com/AjithVanDyk/stagevdrs)


