export const TITLE = "Indie SaaS Status + Incident Desk";
export const PROMISE = "Launch a professional status page and incident desk in minutes.";
export const BUYER = "solo founders, micro-SaaS teams, agencies";
export const PAIN = "Customers need trust signals and founders need a clean incident workflow.";
export const PRICING = "Subscription plus paid custom domains and extra monitors.";
export const WEDGE = "Fast setup, beautiful public pages, and a simple incident postmortem workflow.";
export const DEPLOY = "Vercel for app and public status pages, cron/worker for checks, Supabase/Neon for data, Stripe for subscriptions.";
export const MVP = [
  "Add monitor",
  "Record uptime checks",
  "Publish incident posts",
  "Email subscribers",
  "Custom branding and domain",
  "Archive and search incidents"
];
export const SCREENS = [
  "Public status page",
  "Incident timeline",
  "Subscriber settings",
  "Monitor dashboard",
  "Incident editor",
  "Postmortem page",
  "Admin settings"
];
export const ROUTES = [
  "/",
  "/status/[slug]",
  "/login",
  "/app",
  "/app/monitors",
  "/app/incidents",
  "/app/subscribers",
  "/app/settings"
];
export const LAUNCH = [
  "Start with one excellent status page template",
  "Add incident email templates",
  "Include trust-copy for landing pages"
];
export const V2 = [
  "SMS alerts",
  "API health checks",
  "SLA reporting",
  "Status widget embed"
];
export const product = {
  title: TITLE,
  promise: PROMISE,
  buyer: BUYER,
  pain: PAIN,
  pricing: PRICING,
  wedge: WEDGE,
  deploy: DEPLOY,
  mvp: MVP,
  screens: SCREENS,
  routes: ROUTES,
  launch: LAUNCH,
  v2: V2,
  stack: ["Next.js", "TypeScript", "Postgres", "Stripe", "Vercel"],
};
