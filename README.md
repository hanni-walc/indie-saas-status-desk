# Indie SaaS Status + Incident Desk

Repo: `indie-saas-status-desk`

## One-line pitch
Launch a professional status page and incident desk in minutes.

## Buyer
solo founders, micro-SaaS teams, agencies

## Pain
Customers need trust signals and founders need a clean incident workflow.

## Monetization
Subscription plus paid custom domains and extra monitors.

## Differentiator
Fast setup, beautiful public pages, and a simple incident postmortem workflow.

## What ships in v1
- Add monitor
- Record uptime checks
- Publish incident posts
- Email subscribers
- Custom branding and domain
- Archive and search incidents

## Screens
- Public status page
- Incident timeline
- Subscriber settings
- Monitor dashboard
- Incident editor
- Postmortem page
- Admin settings

## Routes
- `/`
- `/status/[slug]`
- `/login`
- `/app`
- `/app/monitors`
- `/app/incidents`
- `/app/subscribers`
- `/app/settings`

## Deployment
Vercel for app and public status pages, cron/worker for checks, Supabase/Neon for data, Stripe for subscriptions.

## Launch checklist
- Start with one excellent status page template
- Add incident email templates
- Include trust-copy for landing pages

## v2
- SMS alerts
- API health checks
- SLA reporting
- Status widget embed

## Local development
```bash
pnpm install
pnpm dev
```

## Environment variables
Copy `.env.example` and fill in the provider keys for auth, storage, email, and billing.

## Files that matter
- `app/page.tsx`
- `app/app/page.tsx`
- `app/api/health/route.ts`
- `lib/product.ts`
- `.github/workflows/ci.yml`
