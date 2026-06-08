# Indie SaaS Status + Incident Desk

A polished Next.js product slice for solo founders and small SaaS teams who need a trustworthy public status page and a clean internal incident workflow.

## What it includes

- Marketing landing page with trust-focused copy
- Public status page at `/status/[slug]`
- Internal dashboard at `/app`
- Monitors, incidents, subscribers, settings, and login screens
- Health endpoint at `/api/health`
- Shared product logic in `lib/product.ts`
- Vitest coverage for the core business logic
- GitHub Actions CI for test, typecheck, lint, and build

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Vitest
- GitHub Actions

## Local development

```bash
pnpm install
pnpm dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/status/demo-saas`
- `http://localhost:3000/api/health`

## Verification

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm build
```

## Environment

Copy `.env.example` to `.env.local` for real integrations later. The current demo runs without external services.

## Deployment

This repo is ready for Vercel deployment. Add real auth, billing, email, and database providers when moving beyond the demo data shipped here.

## Key files

- `app/page.tsx`
- `app/status/[slug]/page.tsx`
- `app/api/health/route.ts`
- `lib/product.ts`
- `.github/workflows/ci.yml`
