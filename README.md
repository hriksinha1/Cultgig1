# CultGig — 3D Landing Page

A modern, single-page responsive 3D landing page for **CultGig** — a talent marketplace platform connecting artists and freelancers with businesses and venues.

---

## Overview

CultGig connects musicians, photographers, comedians, and creators with restaurants, cafés, hotels, and event organizers. This landing page is designed to:

1. **Drive app downloads** (iOS + Android)
2. **Capture waitlist signups**
3. **Build brand awareness**
4. **Look modern, clean, premium, and trustworthy**

---

## Tech Stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| Frontend    | React 19, Tailwind CSS 3, Framer Motion, Shadcn/UI         |
| 3D Graphics | Three.js (vanilla) with Bloom post-processing               |
| Backend     | FastAPI (Python), Motor (async MongoDB driver)              |
| Database    | MongoDB                                                     |
| Deployment  | Emergent Platform (supervisor-managed)                      |

---

## Project Structure

```
/app/
├── backend/
│   ├── server.py              # FastAPI application with waitlist API
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main app component (composes all sections)
│   │   ├── App.css            # Custom animations (glow, bounce, timeline)
│   │   ├── index.css          # Global styles, fonts, Tailwind config
│   │   ├── index.js           # React entry point
│   │   └── components/
│   │       ├── Navbar.jsx         # Sticky nav with blur + mobile hamburger
│   │       ├── HeroScene.jsx      # Vanilla Three.js 3D canvas + Bloom
│   │       ├── Hero.jsx           # Hero content overlay (headline, CTAs)
│   │       ├── Features.jsx       # 2-column feature cards (Artists/Venues)
│   │       ├── HowItWorks.jsx     # Tabbed 3-step timeline (Shadcn Tabs)
│   │       ├── AppDownload.jsx    # App store CTAs + phone mockup
│   │       ├── WaitlistSignup.jsx # Waitlist form with success state
│   │       ├── Footer.jsx         # Footer with links + social icons
│   │       └── ui/                # Shadcn/UI components
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env                   # Frontend environment variables
├── memory/
│   └── PRD.md                 # Product Requirements Document
└── README.md                  # This file
```

---

## Design System

| Element       | Value                                          |
| ------------- | ---------------------------------------------- |
| Brand Name    | CultGig                                         |
| Primary Accent| `#EAFF00` (electric yellow-green)               |
| Background    | `#000000` to `#0a0a0a`                          |
| Surfaces      | `#111111` / `#1a1a1a`                           |
| Headline Text | `#FFFFFF`                                       |
| Body Text     | `#a0a0a0`                                       |
| Heading Font  | Syne (Google Fonts)                             |
| Body Font     | Satoshi (Fontshare)                             |
| UI Style      | Glassmorphism, neon glow, dark mode             |

---

## Page Sections

1. **Navbar** — Sticky, transparent with backdrop blur. CultGig text logo with accent on "Gig". Mobile hamburger menu.
2. **Hero** — Full viewport with animated 3D canvas background (microphone, camera, musical notes, sound rings, particle field with Bloom). Headline: "Book. Perform. Get Discovered."
3. **Features** — 2-column layout: "For Artists & Creators" and "For Businesses & Venues" with glassmorphism cards.
4. **How It Works** — Tabbed 3-step horizontal timeline using Shadcn Tabs.
5. **App Download** — Split layout with phone mockup and App Store/Google Play buttons.
6. **Waitlist Signup** — Name, email, role select form with success animation state.
7. **Footer** — Logo, quick links, social icons, copyright.

---

## 3D Hero Scene

The hero background uses **vanilla Three.js** (not R3F) with:
- Wireframe glowing microphone, camera, musical notes, sound wave rings
- Instanced particle field (180 particles) for constellation effect
- UnrealBloom post-processing for cinematic neon glow
- Mouse-reactive camera parallax

---

## API Endpoints

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/`             | Health check                 |
| GET    | `/api/health`       | Detailed health check        |
| POST   | `/api/waitlist`     | Join the waitlist            |
| GET    | `/api/waitlist`     | Get all waitlist entries      |
| GET    | `/api/waitlist/count` | Get waitlist signup count  |

---

## Environment Variables

### Backend (`/app/backend/.env`)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

### Frontend (`/app/frontend/.env`)
```
REACT_APP_BACKEND_URL=<your-preview-url>
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

---

## Local Development

```bash
# Backend
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001

# Frontend
cd /app/frontend
yarn install
yarn start
```

---

## License

Copyright 2025 CultGig. All rights reserved.
