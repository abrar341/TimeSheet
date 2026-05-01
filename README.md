# Timesheet Management App

A demo **Timesheet Management** web app built with **Next.js** (App Router). You sign in with email/password against **dummy users**, browse a **paginated, filterable timesheet list**, open a **weekly detail** view with tasks (add / edit / delete), and sign out. All “backend” behavior is implemented with **Next.js Route Handlers** and **in-memory** data stores so the UI and data flow match a real product without standing up a separate API server.

---

## What you can do in the app

- **Login** at `/login` (credentials provider via next-auth).
- **List timesheets** at `/timesheets` with **status** filter and **server-side pagination**.
- **Open a timesheet** (e.g. completed rows) → `/timesheets/[id]` for the week view: hours progress, tasks per day, task modal.
- **Sign out** from the top navigation on timesheet pages.

The home page `/` redirects to `/login`.

---

## Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** (or use your own package manager — adjust commands accordingly)

---

## Setup

1. **Clone** the repository and **install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables** — create `.env.local` in the project root:

   | Variable | Required | Purpose |
   |----------|----------|---------|
   | `NEXTAUTH_SECRET` | Yes (local + prod) | Secret used to sign JWT sessions. Use a long random string. |
   | `NEXTAUTH_URL` | Sometimes | App’s public URL. Often needed in production or if NextAuth warns about the site URL. Example: `http://localhost:3000` for local dev. |

   Minimal example:

   ```env
   NEXTAUTH_SECRET=replace-with-a-long-random-string
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Production build** (optional check)

   ```bash
   npm run build
   npm start
   ```

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js in development (Turbopack). |
| `npm run build` | Create an optimized production build. |

---

## Stack & libraries

| Area | Choice |
|------|--------|
| Framework | **Next.js 16** (App Router), **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4**, **shadcn**-style primitives (Radix Dialog, `cva`, `cn`) |
| Auth | **next-auth v4** — Credentials provider, **JWT** sessions |
| Server data | **TanStack Query** for requests, cache, and mutations |
| Tables | **TanStack Table** |
| Forms | **React Hook Form** + **Yup** + **@hookform/resolvers** |
| HTTP client | **Axios** with a small `utils/api` wrapper (base URL `/api`) |
| Icons | **lucide-react** |
| Tests | **Vitest**, **@testing-library/react**, **jsdom** |

---

## Project layout (high level)

- **`app/`** — routes, layouts, and **Route Handlers** under `app/api/**`.
- **`components/`** — shared UI (`ui/`, `common/`, `grid/`, `layout/`, cards, dialogs, providers).
- **`modules/`** — feature-oriented slices (`auth/`, `timesheets/`, `common/`): hooks, types, schemas, constants, feature components.
- **`lib/`** — auth config (`lib/auth.ts`), shared utils alias, **`lib/data/`** in-memory dummy stores (users, timesheets, tasks).
- **`utils/`** — API helpers (`request-service`, interceptors) and miscellaneous utilities.
- **`types/`** — global TS augmentations (e.g. next-auth).

This is intentional: routes stay thin; **hooks + modules** own most of the “application” logic.

---

## API surface (dummy)

Rough map of handlers (all JSON, backed by `lib/data/` unless noted):

| Method / path | Role |
|---------------|------|
| `GET/POST …/api/auth/[...nextauth]` | NextAuth |
| `GET /api/timesheets` | List with `status`, `page`, `pageSize` |
| `POST /api/timesheets` | Create timesheet row |
| `GET/PATCH …/api/timesheets/[id]` | Detail / update summary row |
| `POST …/api/timesheets/[id]/tasks` | Add task |
| `PATCH/DELETE …/tasks/[taskId]` | Update / delete task |

Replace these handlers with calls to your real database or microservices when moving beyond the demo.

---

## Dummy login

Users are defined in **`lib/data/users.ts`**. Passwords are plain strings in that file for demo purposes only — **do not** copy that pattern to production.

---

## Assumptions & notes

- **No real persistence:** Data lives in memory. Restarting the dev server resets timesheets and tasks.
- **Auth is illustrative:** Credential checks are against static data; swap in hashed passwords + DB as needed.
- **Route protection:** The project uses **`proxy.ts`** per current Next.js guidance (middleware naming has shifted); matcher paths protect `/timesheets` and `/login` behavior — review `proxy.ts` if you add routes.
- **Fonts:** Google Fonts via `next/font` are **not** used in root layout so **builds succeed without downloading fonts** (useful offline or locked-down CI). Typography uses CSS font stacks in `globals.css`.
- **Dev tooling:** Next.js dev indicators can be toggled via `next.config.ts` (`devIndicators`).

---

## Tests (where they go — no full-app coverage goal)

There is **no expectation** that every route, hook, or component has tests. Add tests **only where they pay off**, and prefer **narrow, stable units** over blanket coverage.

**Suggested flow:**

1. **Start with correctness you can freeze without the browser**  
   Yup schemas, type converters (`to…Type`), and small pure helpers are cheap to test: given input → expected output or validation errors.

2. **Shared UI worth regressing**  
   If a dialog, form control, or table wrapper has non-trivial behavior (open state, accessibility, branching props), exercise it with Testing Library — mount, assert text or roles, simulate one or two interactions. Skip styling-only snapshots unless your team mandates them.

3. **Hooks and data layer (optional)**  
   When a hook’s logic is brittle (query keys, pagination math, aggregation), wrap it with the Query client/provider in tests, or extract the math into a pure function and test that instead — fewer moving parts.

4. **Colocation rule of thumb**  
   Keep tests **near the code they protect** inside the same feature or component area (Vitest discovers by pattern from the repo root — follow whatever suffix your config uses). Avoid a separate “mega `tests/` mirror” unless you intentionally split integration suites.

5. **What to skip unless required**  
   Page files that mostly compose hooks and markup, Layout shells, thin API route handlers whose behavior is trivial delegation — rely on lint, manual QA, or later E2E if you introduce it.

Run the existing suite anytime:

```bash
npm test
```

---


## Time spent

Not tracked.
