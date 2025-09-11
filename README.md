# Tanvir Azad — Portfolio

A modern, animated portfolio built with **Next.js (App Router) + TypeScript**, styled with **Tailwind CSS** and **shadcn/ui**, and themed via CSS variables (light / dark / forest). Page and content transitions are powered by **Framer Motion**.

---

## ✨ Features

- **Next.js (App Router)** with TypeScript
- **Tailwind CSS** utility-first styling
- **shadcn/ui** components (Radix primitives) — e.g. `Select`, `Card`, `Skeleton`
- **Theming** via CSS custom properties and class-based themes (`light`, `dark`, `forest`)
- **Framer Motion** transitions with `AnimatePresence`
- Compact **Theme Switcher** using a shadcn `Select`

---

## 🧱 Tech Stack

- **Framework**: Next.js + TypeScript
- **Styling**: Tailwind CSS, CSS variables
- **UI**: shadcn/ui (Radix UI primitives)
- **Animation**: Framer Motion

---

## 🚀 Getting Started

### 1) Install dependencies
```bash
pnpm install
# or
npm install
# or
yarn
```

### 2) Run the dev server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

### 3) Build & start (production)
```bash
pnpm build && pnpm start
# or npm run build && npm start
# or yarn build && yarn start
```

### 4) Lint
```bash
pnpm lint
# or npm run lint
# or yarn lint
```

---

## 🗂️ Project Structure (example)

> The exact layout may vary, but this is a typical structure for App Router projects and mirrors the code in this repository.

```
/
├─ public/                       # static assets
├─ app/
│  ├─ layout.tsx                 # root layout (fonts, providers, theme class)
│  └─ page.tsx                   # homepage
├─ components/
│  ├─ theme-switcher.tsx         # shadcn Select-based theme dropdown
│  ├─ SectionCard.tsx            # section list/details
│  ├─ SectionHeader.tsx          # header with back/action UI
│  └─ ui/                        # shadcn components (select, card, skeleton, ...)
├─ providers/
│  └─ SectionProvider.tsx        # section state (active tab/section)
├─ data/
│  └─ useFirestoreCollection.ts  # hook to fetch collection by section
├─ styles/ or ./ (globals.css)   # Tailwind + CSS variables
├─ tailwind.config.*
├─ tsconfig.json
└─ package.json
```

---

## 📄 License

MIT — feel free to adapt this setup for your own portfolio.
