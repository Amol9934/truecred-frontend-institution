# TrueCred Institution Portal — CLAUDE.md

## Project Overview

**TrueCred** — Cryptographically secure academic certificate verification platform.
**SIH 2025** | Team ID: 67239 | Problem Statement: 25029

This repo (`frontend_institution/`) is the **Institution Dashboard** — used by university admins / registrars to issue, manage, and monitor academic certificates. It is a separate app from `frontend_verifier/` (the public-facing portal).

## Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.2.x | UI framework |
| Vite | 5.1.x | Build tool, dev server (port **5174**) |
| Tailwind CSS | 3.4.x | Styling (dark mode via `class`) |
| Zustand | 4.5.x | Global state (auth, certs) |
| Recharts | 2.12.x | Analytics charts |
| React Dropzone | 14.2.x | Certificate file upload |
| qrcode.react | 3.1.x | QR code generation |
| react-hot-toast | 2.4.x | Notifications |
| React Router DOM | 6.22.x | Routing |
| Lucide React | 0.383.x | Icons |

## Commands

```bash
npm run dev      # dev server → http://localhost:5174
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Folder Structure

```
frontend_institution/
├── public/
│   └── logo.svg, favicon.ico
├── src/
│   ├── api/
│   │   ├── auth.js           # Mock: loginInstitution, logoutInstitution
│   │   ├── certificates.js   # Mock: getStats, getCertificates, issueCertificate, revokeCertificate
│   │   └── students.js       # Mock: getStudents, getStudentById
│   ├── assets/
│   │   ├── icons/
│   │   └── logo.jsx          # SVG logo component
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Top bar: search, notifications, profile dropdown
│   │   │   ├── Sidebar.jsx     # Collapsible left sidebar with nav links
│   │   │   └── PageWrapper.jsx # Sidebar + Navbar + <Outlet> layout shell
│   │   ├── certificates/
│   │   │   ├── CertificateCard.jsx  # Single cert display card
│   │   │   ├── CertificateTable.jsx # Paginated table + view/QR/revoke actions
│   │   │   ├── IssueForm.jsx        # 3-step wizard: student info → upload → confirm
│   │   │   └── QRPreview.jsx        # QR code preview panel (qrcode.react)
│   │   ├── students/
│   │   │   ├── StudentCard.jsx
│   │   │   └── StudentTable.jsx
│   │   └── ui/
│   │       ├── Badge.jsx    # Status badges: verified|pending|flagged|revoked
│   │       ├── Button.jsx   # variants: primary|secondary|success|danger|outline|ghost
│   │       ├── Modal.jsx    # Backdrop + animated modal, sizes: sm|md|lg|xl
│   │       ├── StatCard.jsx # 3D mouse-tilt stat card with shimmer
│   │       └── Table.jsx    # Generic table wrapper
│   ├── pages/
│   │   ├── Login.jsx             # /login — animated 3D hero + login form
│   │   ├── Dashboard.jsx         # /institution/dashboard
│   │   ├── IssueCertificate.jsx  # /institution/issue
│   │   ├── AllCertificates.jsx   # /institution/certificates
│   │   ├── Students.jsx          # /institution/students
│   │   ├── Analytics.jsx         # /institution/analytics — Recharts charts
│   │   └── Settings.jsx          # /institution/settings
│   ├── store/
│   │   ├── authStore.js    # Zustand + persist: isAuthenticated, institution, token
│   │   └── certStore.js    # Zustand: certificates[], stats{}, loading
│   ├── utils/
│   │   ├── formatDate.js   # formatDate, formatDateShort, timeAgo
│   │   ├── statusColor.js  # getStatusColor, getStatusDot, getStatusLabel
│   │   └── validators.js   # validateCertForm, validateEmail, validateRollNo
│   ├── App.jsx             # Route definitions + ProtectedRoute
│   ├── main.jsx            # React 18 createRoot
│   └── index.css           # Tailwind + extensive CSS utilities (glass, glow, float...)
├── index.html              # Loads Sora + JetBrains Mono from Google Fonts
├── .env
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Routing

All protected routes live under `/institution/*` and redirect to `/login` if not authenticated.

| Route | Page | Auth |
|---|---|---|
| `/login` | Login | No |
| `/institution/dashboard` | Dashboard | Yes |
| `/institution/issue` | Issue Certificate | Yes |
| `/institution/certificates` | All Certificates | Yes |
| `/institution/students` | Students | Yes |
| `/institution/analytics` | Analytics | Yes |
| `/institution/settings` | Settings | Yes |

Auth guard is in `App.jsx` via `ProtectedRoute` which reads `useAuthStore().isAuthenticated`.

## Design System

This portal uses a **dark theme** (deep navy + glass morphism + glows), distinct from `frontend_verifier/` which uses a light teal theme.

### Color Tokens (tailwind.config.js + CSS variables)

```js
primary:     '#1B3A5C'   // main navy
accent:      '#2563A8'   // interactive blue, buttons, active states
success:     '#0F6E56'   // teal green
warning:     '#BA7517'   // amber
danger:      '#993C1D'   // burnt red
dark-bg:     '#060D1A'   // page background
dark-surface:'#0D1B2A'   // card/panel background
dark-card:   '#112236'   // nested card background
dark-border: '#1E3A5F'   // border color
```

### Fonts

- **Sora** — body, UI text (loaded in `index.html`)
- **JetBrains Mono** — code displays, cert IDs, hashes (loaded in `index.html`)
- **Clash Display** — large headings (tailwind alias, falls back to Sora)

### Key CSS Utilities (defined in `index.css`)

| Class | Purpose |
|---|---|
| `.glass` | Glassmorphism panel (dark, blurred) |
| `.gradient-text` | Blue → teal gradient text |
| `.fade-up` | Entrance animation (0.7s ease) |
| `.fade-up-delay-{1-4}` | Staggered entrance (0.1s increments) |
| `.float` | Floating bob animation |
| `.code-display` | JetBrains Mono style for IDs/hashes |
| `.btn-glow` | Hover glow + lift on buttons |
| `.input-glow` | Blue focus glow on form inputs |
| `.sidebar-active` | Active sidebar item (left border + gradient) |
| `.table-row-hover` | Subtle row hover in tables |
| `.grid-pattern` | Subtle dot-grid background |
| `.shimmer-line` | Animated shimmer overlay on cards |

## State Management

### `authStore.js` — Persisted to `localStorage` key `truecred-auth`
```js
{
  isAuthenticated: false,
  institution: { id, name, code, logo, adminName, email } | null,
  token: string | null,

  login(institutionData, token),
  logout(),
}
```

### `certStore.js` — In-memory only
```js
{
  certificates: [],
  stats: { total, verifiedThisMonth, pending, flagged },
  loading: false,

  setCertificates(certs),
  setStats(stats),
  setLoading(loading),
  addCertificate(cert),
}
```

## Mock API Behaviour

All API functions in `src/api/` use `Promise` delays for realism. No real network calls in dev.

| File | Function | Delay | Notes |
|---|---|---|---|
| `auth.js` | `loginInstitution(code, password)` | 1200ms | Any non-empty code + password works |
| `certificates.js` | `getStats()` | — | Returns static counts |
| `certificates.js` | `getCertificates({ page, status })` | — | 8 mock certs, filterable by status |
| `certificates.js` | `issueCertificate(data)` | 1500ms | Returns new cert with random `TC-2024-XXX` ID |
| `certificates.js` | `revokeCertificate(id)` | — | Returns `{ id, status: 'revoked' }` |
| `students.js` | `getStudents(search)` | — | 6 mock students, searchable by name/rollNo |

## Environment Variables

```env
VITE_API_URL=http://localhost:8000
```

Vite dev server proxies `/api/*` → `http://localhost:8000` (strips the `/api` prefix). Point `VITE_API_URL` at the real Django backend in production.

## Backend Integration (when ready)

Replace mock functions in `src/api/` with real `axios` calls. Example:

```js
// auth.js
import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const loginInstitution = (code, password) =>
  api.post('/api/auth/institution/login/', { code, password }).then(r => r.data)
```

Expected backend endpoints (Django REST):
- `POST /api/auth/institution/login/`
- `POST /api/auth/logout/`
- `GET  /api/certificates/`
- `POST /api/certificates/issue/`
- `PATCH /api/certificates/{id}/revoke/`
- `GET  /api/certificates/stats/`
- `GET  /api/students/`

## Bugs Fixed (2026-05-14)

| File | Issue | Fix |
|---|---|---|
| `Sidebar.jsx` | `<NavLink>` nested inside `<NavLink>` → invalid `<a>` in `<a>` | Replaced inner NavLink with inline conditional using outer `isActive` |
| `Sidebar.jsx` | `Help` menu item linked to `/institution/help` which has no route | Removed Help item from sidebar menu |
| `vite.config.js` | No backend proxy → CORS errors in dev | Added `/api` proxy to `localhost:8000` |
| `vite.config.js` | No `@` path alias, no code splitting | Added `@` alias + `manualChunks` (vendor/router/charts/qr/store) |
| `formatDate.js` | `new Date('YYYY-MM-DD')` parsed as UTC → off-by-one in IST | Appends `T00:00:00` for bare date strings |

## Notes

- Dev server runs on port **5174** (not 5173) to avoid collision with `frontend_verifier/`
- `qrcode.react` uses `<QRCodeSVG>` named export — use `import { QRCodeSVG } from 'qrcode.react'`
- `react-dropzone` is used only in `IssueForm.jsx` for certificate document upload
- `recharts` is split into its own chunk (410KB gzip: 111KB) — loads lazily on Analytics page
- `Sora` and `JetBrains Mono` are loaded from Google Fonts in `index.html` — not bundled
- `authStore` persists via `zustand/middleware#persist` — clearing `truecred-auth` from localStorage forces re-login
