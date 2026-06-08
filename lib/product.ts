export type Monitor = {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptimePct: number;
};

export type Incident = {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  summary: string;
  timeline: string[];
  nextStep: string;
  startedAt: string;
};

export type StatusSnapshot = {
  overall: 'operational' | 'degraded' | 'partial outage' | 'major outage';
  monitorCount: number;
  healthyMonitors: number;
  activeIncidents: number;
  uptimeAverage: number;
};

export type PublicStatusCopy = {
  headline: string;
  body: string;
  badges: string[];
  cta: string;
};

export type StatusPageCopy = PublicStatusCopy & {
  boardName: string;
  slug: string;
};

export type IncidentBrief = {
  title: string;
  summary: string;
  timeline: string[];
  nextStep: string;
};

export const TITLE = 'Indie SaaS Status + Incident Desk';
export const PROMISE = 'Launch a professional status page and incident desk in minutes.';
export const BUYER = 'solo founders, micro-SaaS teams, agencies';
export const PAIN = 'Customers need trust signals and founders need a clean incident workflow.';
export const PRICING = 'Subscription plus paid custom domains and extra monitors.';
export const WEDGE = 'Fast setup, beautiful public pages, and a simple incident postmortem workflow.';
export const DEPLOY = 'Vercel for app and public status pages, cron/worker for checks, Supabase/Neon for data, Stripe for subscriptions.';
export const MVP = [
  'Add monitor',
  'Record uptime checks',
  'Publish incident posts',
  'Email subscribers',
  'Custom branding and domain',
  'Archive and search incidents',
];
export const SCREENS = [
  'Public status page',
  'Incident timeline',
  'Subscriber settings',
  'Monitor dashboard',
  'Incident editor',
  'Postmortem page',
  'Admin settings',
];
export const ROUTES = [
  '/',
  '/status/[slug]',
  '/login',
  '/app',
  '/app/monitors',
  '/app/incidents',
  '/app/subscribers',
  '/app/settings',
];
export const LAUNCH = [
  'Start with one excellent status page template',
  'Add incident email templates',
  'Include trust-copy for landing pages',
];
export const V2 = [
  'SMS alerts',
  'API health checks',
  'SLA reporting',
  'Status widget embed',
];

export const sampleMonitors: Monitor[] = [
  { name: 'Public API', status: 'healthy', uptimePct: 99.98 },
  { name: 'Billing webhooks', status: 'healthy', uptimePct: 99.92 },
  { name: 'Dashboard app', status: 'degraded', uptimePct: 99.8 },
];

export const sampleIncidents: Incident[] = [
  {
    id: 'inc-204',
    title: 'API latency spike',
    status: 'monitoring',
    severity: 'minor',
    summary: 'We saw a customer-facing spike in API latency and are actively watching the fix settle.',
    timeline: ['Detected at 14:12 UTC', 'Mitigation deployed at 14:20 UTC', 'Monitoring for recovery'],
    nextStep: 'Send a follow-up after another healthy check window.',
    startedAt: '2026-06-07T14:12:00Z',
  },
  {
    id: 'inc-203',
    title: 'Billing webhook delay',
    status: 'resolved',
    severity: 'major',
    summary: 'Webhook delivery delayed for a subset of customers; the queue has fully recovered.',
    timeline: ['Detected at 09:40 UTC', 'Queue drained at 10:05 UTC', 'Resolution posted at 10:22 UTC'],
    nextStep: 'Archive the postmortem and share the root-cause recap.',
    startedAt: '2026-06-07T09:40:00Z',
  },
];

export function buildStatusSnapshot(monitors: Monitor[], incidents: Incident[]): StatusSnapshot {
  const monitorCount = monitors.length;
  const healthyMonitors = monitors.filter((monitor) => monitor.status === 'healthy').length;
  const activeIncidents = incidents.filter((incident) => incident.status !== 'resolved').length;
  const uptimeAverage = Math.round((monitors.reduce((sum, monitor) => sum + monitor.uptimePct, 0) / Math.max(monitorCount, 1)) * 100) / 100;

  const overall: StatusSnapshot['overall'] =
    activeIncidents === 0
      ? 'operational'
      : activeIncidents === 1 && healthyMonitors >= Math.ceil(monitorCount / 2)
        ? 'operational'
        : activeIncidents === 1
          ? 'degraded'
          : activeIncidents === 2
            ? 'partial outage'
            : 'major outage';

  return { overall, monitorCount, healthyMonitors, activeIncidents, uptimeAverage };
}

export function buildIncidentBrief(incident: Incident): IncidentBrief {
  return {
    title: `${incident.title} — ${incident.status}`,
    summary: incident.summary,
    timeline: incident.timeline,
    nextStep: incident.nextStep,
  };
}

export function formatStatusBoardName(slug: string): string {
  const cleaned = slug
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');

  if (!cleaned) {
    return 'Status Board';
  }

  const titleCaseWords = cleaned.split(' ').map((word) => {
    const lowerWord = word.toLowerCase();

    if (lowerWord === 'saas') {
      return 'SaaS';
    }

    if (['api', 'ui', 'db', 's3', 'sla'].includes(lowerWord)) {
      return lowerWord.toUpperCase();
    }

    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  });

  return titleCaseWords.join(' ');
}

export function buildStatusPageCopy(slug: string, monitors: Monitor[], incidents: Incident[]): StatusPageCopy {
  const boardName = formatStatusBoardName(slug);
  const copy = buildPublicStatusCopy(monitors, incidents);

  return {
    ...copy,
    boardName,
    slug: slug.trim() || 'status-board',
    headline: `${boardName} — ${copy.headline}`,
    body: copy.body,
  };
}

export function buildPublicStatusCopy(monitors: Monitor[], incidents: Incident[]): PublicStatusCopy {
  const snapshot = buildStatusSnapshot(monitors, incidents);
  const activeIncident = incidents.find((incident) => incident.status !== 'resolved');

  return {
    headline: `Status is ${snapshot.overall}`,
    body: activeIncident
      ? `We are tracking ${activeIncident.title.toLowerCase()} and will keep this page updated until recovery is confirmed.`
      : `Everything is healthy and the latest checks are within normal range.`,
    badges: [
      `${snapshot.healthyMonitors}/${snapshot.monitorCount} monitors healthy`,
      `${snapshot.uptimeAverage.toFixed(2)}% average uptime`,
      `${snapshot.activeIncidents} active incident${snapshot.activeIncidents === 1 ? '' : 's'}`,
    ],
    cta: 'subscribe for email alerts and incident updates.',
  };
}

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
  stack: ['Next.js', 'TypeScript', 'Postgres', 'Stripe', 'Vercel'],
};
