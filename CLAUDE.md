# CLAUDE.md — GO University Student & Staff Portal

This file is read automatically by Claude Code at the start of every session.
Follow every instruction here before writing or modifying any code.

---

## Project Overview

This is the **Godfrey Okoye University (GO University) Student Portal** — a role-based academic management platform built for an HCI study. It covers student, staff, admin, and super-admin workflows including payments, course registration, results, clearance, and hostel management.

---

## Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 14 with App Router                       |
| Language   | TypeScript (strict mode)                         |
| Styling    | Tailwind CSS + shadcn/ui                         |
| Animations | Framer Motion                                    |
| Icons      | Lucide React                                     |
| Storage    | Browser LocalStorage (client-side DB simulation) |
| Deployment | Vercel                                           |

---

## Essential Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build — run before every commit
npm run lint         # ESLint check — must pass before any PR
npm run type-check   # TypeScript compiler check — must pass
```

Always run `npm run build` and `npm run lint` before considering any task complete.
If either fails, fix the errors before moving on.

---

## Project Structure

```
/app                   # Next.js App Router pages
  /admin               # Admin module routes
  /staff               # Staff module routes
  /student             # Student module routes
  /superadmin          # Super Admin module routes
  /parent              # Parent/Guardian module routes
  /login               # Login page
  /activate            # New student activation wizard
  /reset-password      # Password reset flow
/components
  /ui                  # shadcn/ui primitives — DO NOT EDIT these files
  /shared              # Shared layout components (Sidebar, TopBar, etc.)
  /student             # Student-specific components
  /staff               # Staff-specific components
  /admin               # Admin-specific components
  /print               # Printable document components (invoice, transcript, etc.)
/lib
  /storage.ts          # All localStorage read/write helpers — use these, never access localStorage directly
  /auth.ts             # Auth helpers and role checks
  /utils.ts            # Shared utility functions (cn, formatCurrency, etc.)
  /constants.ts        # App-wide constants (roles, fee types, departments, etc.)
/hooks                 # Custom React hooks
/types                 # TypeScript type definitions and interfaces
/public                # Static assets (logo, icons)
```

---

## Architecture Rules

### LocalStorage Layer

- **Never** access `localStorage` directly anywhere in the codebase
- All reads and writes go through helpers in `/lib/storage.ts`
- The canonical storage key namespace is `gouni_*` (e.g., `gouni_users`, `gouni_payments`, `gouni_results`)
- Always handle `JSON.parse` errors — storage can be corrupted or empty

### Auth & Roles

- User session is stored under `gouni_session` in localStorage
- Valid roles: `student` | `staff` | `admin` | `superadmin` | `parent`
- Role checks live in `/lib/auth.ts` — use the exported helpers, never inline role string comparisons
- Every protected page must call `useRequireRole(role)` at the top of the component

### Routing

- Use Next.js App Router file-based routing — no `pages/` directory
- Route groups are organised by role: `(student)`, `(staff)`, `(admin)`, `(superadmin)`, `(parent)`
- Client components that use hooks or browser APIs must have `'use client'` at the top
- Prefer server components for layout wrappers and static content

### State Management

- Local UI state: `useState` / `useReducer`
- Cross-component shared state: React Context (contexts live in `/lib/context/`)
- No external state libraries (no Redux, no Zustand)
- Multi-step form state must be persisted to localStorage on every step change (not just on submit)

---

## Design System Rules

### Colours — use these exact values, never hardcode others

```
Primary:    #113791   (buttons, sidebar background, active states, accent cards)
Background: #FFFFFF   (page and card backgrounds)
Shell:      #F9FAFB   (outer page background behind cards)
Border:     #E5E7EB   (card borders, dividers)
Success:    #16A34A   (badges, toasts, approved states)
Warning:    #D97706   (pending badges, deadline alerts)
Error:      #DC2626   (failed states, destructive actions, inline errors)
Muted:      #6B7280   (secondary labels, metadata, placeholders)
```

### Tailwind Config

- Always use Tailwind utility classes — no inline `style={{}}` props for layout or colour
- Exceptions allowed: dynamic values that cannot be expressed as static Tailwind classes (e.g., chart colours, progress bar widths)
- The `cn()` utility from `/lib/utils.ts` must be used for conditional class merging — never string concatenation

### shadcn/ui

- Use shadcn/ui components for all form inputs, dialogs, dropdowns, toasts, and tables
- Do not override shadcn/ui component internals — extend via `className` props only
- `/components/ui/` files are auto-generated — never edit them manually

### Typography

- Font: Inter (loaded via `next/font`)
- Page titles: `text-2xl font-bold`
- Section headings: `text-lg font-semibold`
- Body: `text-sm` or `text-base`
- Metadata / labels: `text-xs text-muted-foreground`

---

## Component Conventions

- One component per file
- File name matches the exported component name in PascalCase: `StudentDashboard.tsx`
- All components are typed — no `any`, no untyped props
- Destructure props at the function signature level
- Every component that fetches or mutates data shows a loading state (skeleton or spinner) and an error state
- Every list/table must have an empty state with an illustration, message, and CTA

```tsx
// Correct pattern
export function PaymentTable({ payments }: PaymentTableProps) {
  if (loading) return <PaymentTableSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!payments.length) return <EmptyState message="No payments found" />;
  return <table>...</table>;
}
```

---

## Print Document Rules

All "Download / Print as PDF" features use `window.print()` — no PDF library is used.

- Printable components live in `/components/print/`
- Every printable component is wrapped in a `<div className="print-root">`
- The global print stylesheet is at `/app/globals.css` under `@media print`
- Trigger pattern:

```tsx
const handlePrint = () => {
  setShowPrint(true);
  setTimeout(() => {
    window.print();
    setShowPrint(false);
  }, 300);
};
```

- Never trigger `window.print()` inside a `useEffect` with no delay

---

## Mock Payment Rules

There is no real payment gateway. The mock checkout modal lives at `/components/shared/MockPaymentModal.tsx`.

- Always use this component for payment flows — do not build new payment UI elsewhere
- On "success" path: update `gouni_payments` in localStorage via `/lib/storage.ts`
- On "failure" path: update status to `failed`, show retry option
- The 2-second simulated delay is intentional — do not remove it (it is part of the UX demo)

---

## Framer Motion Rules

- Use Framer Motion only for: page transitions, modal entrance/exit, and card hover states
- Do not animate layout shifts or table rows (causes jank with long lists)
- Keep animations under 300ms for micro-interactions, 500ms for page transitions
- Respect `prefers-reduced-motion` — wrap motion components conditionally

---

## What NOT to Do

- Do not install new npm packages without checking if the need can be met by an existing dependency
- Do not use `localStorage` directly — always go through `/lib/storage.ts`
- Do not edit files in `/components/ui/` — they are generated by shadcn/ui
- Do not add `console.log` statements in production code — use the `debug()` helper from `/lib/utils.ts`
- Do not use `any` type — use `unknown` and narrow it, or define a proper type in `/types/`
- Do not hardcode colour hex values in components — use Tailwind classes that map to the design system
- Do not use `<a>` tags for internal navigation — always use Next.js `<Link>`
- Do not bypass the `useRequireRole` auth check on any protected page

---

## Demo Credentials

| Role    | ID        | Password  |
| ------- | --------- | --------- |
| Admin   | `admin`   | `admin`   |
| Staff   | `staff`   | `staff`   |
| Student | `student` | `student` |

These are seeded in the initial localStorage state via `/lib/storage.ts` `initStorage()`.

---

## Definition of Done

A task is complete only when all of the following are true:

- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run type-check` passes
- [ ] The feature works at 375px mobile width
- [ ] Loading, empty, and error states are handled
- [ ] No `any` types introduced
- [ ] No direct `localStorage` access outside `/lib/storage.ts`
