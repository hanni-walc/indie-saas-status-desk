export type MonitorStatus = 'healthy' | 'degraded' | 'down';
export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';
export type IncidentSeverity = 'minor' | 'major' | 'critical';

export type StatusDeskMonitor = {
  name: string;
  route: string;
  status: MonitorStatus;
  uptimePct: number;
  latencyMs: number;
  checkEveryMinutes: number;
  owner: string;
  lastCheckedAt: string;
};

export type StatusDeskIncident = {
  id: string;
  title: string;
  service: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  summary: string;
  audience: string;
  startedAt: string;
  updatedAt: string;
  timeline: string[];
  nextStep: string;
  assignee: string;
};

export type SubscriberSegment = {
  name: string;
  count: number;
  channel: 'email' | 'sms';
  delivery: 'instant' | 'digest';
  source: string;
};

export type StatusDeskSettings = {
  brandName: string;
  publicDomain: string;
  replyToEmail: string;
  accentColor: string;
  quietHours: string;
  digestDay: string;
  autoArchiveDays: number;
  customDomainConnected: boolean;
  notificationEmailReady: boolean;
};

export type DeskSummary = {
  overallState: 'operational' | 'degraded' | 'major outage';
  monitorCount: number;
  healthyMonitors: number;
  activeIncidents: number;
  subscriberCount: number;
  averageUptime: number;
  primaryAction: string;
  headline: string;
};

export type IncidentWorkspace = {
  title: string;
  audience: string;
  latestUpdate: string;
  nextStep: string;
  timeline: string[];
  severityLabel: string;
  publishState: 'draft' | 'ready';
};

export type MonitorBoard = {
  averageUptime: number;
  healthyMonitors: number;
  rows: Array<{
    name: string;
    route: string;
    statusLabel: MonitorStatus;
    latencyLabel: string;
    owner: string;
    checkCadence: string;
    alertLevel: 'green' | 'watch' | 'urgent';
  }>;
};

export type SubscriberBoard = {
  totalSubscribers: number;
  primarySegment: string;
  channelSummary: string;
  messageDraft: string;
  segments: SubscriberSegment[];
};

export type SettingsBoard = {
  publicDomain: string;
  readyToPublish: boolean;
  sections: Array<{
    title: string;
    items: readonly string[];
    status: 'complete' | 'needs attention';
  }>;
};

export const sampleMonitors: StatusDeskMonitor[] = [
  {
    name: 'Public API',
    route: 'api.helioflow.dev',
    status: 'healthy',
    uptimePct: 99.98,
    latencyMs: 142,
    checkEveryMinutes: 1,
    owner: 'Platform',
    lastCheckedAt: '2 minutes ago',
  },
  {
    name: 'Billing webhooks',
    route: 'billing.helioflow.dev',
    status: 'healthy',
    uptimePct: 99.92,
    latencyMs: 188,
    checkEveryMinutes: 5,
    owner: 'Finance ops',
    lastCheckedAt: '4 minutes ago',
  },
  {
    name: 'Dashboard app',
    route: 'app.helioflow.dev',
    status: 'degraded',
    uptimePct: 99.8,
    latencyMs: 482,
    checkEveryMinutes: 1,
    owner: 'Frontend',
    lastCheckedAt: '1 minute ago',
  },
];

export const sampleIncidents: StatusDeskIncident[] = [
  {
    id: 'inc-204',
    title: 'API latency spike',
    service: 'Public API',
    status: 'monitoring',
    severity: 'minor',
    summary: 'We saw a customer-facing spike in API latency and are actively watching the fix settle.',
    audience: 'Status page and email subscribers',
    startedAt: '2026-06-07T14:12:00Z',
    updatedAt: '2026-06-07T14:20:00Z',
    timeline: ['Detected at 14:12 UTC', 'Mitigation deployed at 14:20 UTC', 'Monitoring for recovery'],
    nextStep: 'Send a follow-up after another healthy check window.',
    assignee: 'Ops lead on duty',
  },
  {
    id: 'inc-203',
    title: 'Billing webhook delay',
    service: 'Billing webhooks',
    status: 'resolved',
    severity: 'major',
    summary: 'Webhook delivery delayed for a subset of customers; the queue has fully recovered.',
    audience: 'Enterprise contacts and support',
    startedAt: '2026-06-07T09:40:00Z',
    updatedAt: '2026-06-07T10:22:00Z',
    timeline: ['Detected at 09:40 UTC', 'Queue drained at 10:05 UTC', 'Resolution posted at 10:22 UTC'],
    nextStep: 'Archive the postmortem and share the root-cause recap.',
    assignee: 'Customer success',
  },
];

export const sampleSubscribers: SubscriberSegment[] = [
  {
    name: 'All customers',
    count: 228,
    channel: 'email',
    delivery: 'instant',
    source: 'Status page subscriptions',
  },
  {
    name: 'Enterprise contacts',
    count: 42,
    channel: 'email',
    delivery: 'digest',
    source: 'Account-level subscriptions',
  },
  {
    name: 'Internal ops team',
    count: 14,
    channel: 'sms',
    delivery: 'instant',
    source: 'Escalation routing',
  },
];

export const sampleSettings: StatusDeskSettings = {
  brandName: 'HelioFlow',
  publicDomain: 'status.helioflow.dev',
  replyToEmail: 'status@helioflow.dev',
  accentColor: '#7c3aed',
  quietHours: '11:00 PM - 6:00 AM UTC',
  digestDay: 'Monday',
  autoArchiveDays: 30,
  customDomainConnected: true,
  notificationEmailReady: true,
};

function statusRank(status: MonitorStatus): number {
  if (status === 'down') return 0;
  if (status === 'degraded') return 1;
  return 2;
}

export function buildDeskSummary(
  monitors: StatusDeskMonitor[],
  incidents: StatusDeskIncident[],
  subscribers: SubscriberSegment[],
): DeskSummary {
  const monitorCount = monitors.length;
  const healthyMonitors = monitors.filter((monitor) => monitor.status === 'healthy').length;
  const activeIncidents = incidents.filter((incident) => incident.status !== 'resolved').length;
  const subscriberCount = subscribers.reduce((total, segment) => total + segment.count, 0);
  const averageUptime = Math.round((monitors.reduce((sum, monitor) => sum + monitor.uptimePct, 0) / Math.max(monitorCount, 1)) * 10) / 10;
  const degradedCount = monitors.filter((monitor) => monitor.status === 'degraded').length;
  const downCount = monitors.filter((monitor) => monitor.status === 'down').length;

  const overallState: DeskSummary['overallState'] =
    downCount > 0 || activeIncidents > 1 ? 'major outage' : degradedCount > 0 || activeIncidents === 1 ? 'degraded' : 'operational';

  const headline =
    overallState === 'operational'
      ? 'Everything is healthy and subscriber communication is ready.'
      : 'One surface needs attention, but the response plan is already in motion.';

  const primaryAction =
    activeIncidents > 0
      ? 'publish the next incident update and keep subscribers informed.'
      : 'review the monitor board and prepare your launch checklist.';

  return {
    overallState,
    monitorCount,
    healthyMonitors,
    activeIncidents,
    subscriberCount,
    averageUptime,
    primaryAction,
    headline,
  };
}

export function buildIncidentWorkspace(incident: StatusDeskIncident): IncidentWorkspace {
  const statusLabel = incident.status.charAt(0).toUpperCase() + incident.status.slice(1);

  return {
    title: incident.title,
    audience: incident.audience,
    latestUpdate: `Last updated ${incident.updatedAt} · ${statusLabel}`,
    nextStep: incident.nextStep,
    timeline: incident.timeline,
    severityLabel: `${incident.severity} incident for ${incident.service}`,
    publishState: incident.status === 'resolved' ? 'ready' : 'draft',
  };
}

export function buildMonitorBoard(monitors: StatusDeskMonitor[]): MonitorBoard {
  const sortedMonitors = [...monitors].sort((left, right) => {
    const statusDelta = statusRank(left.status) - statusRank(right.status);
    if (statusDelta !== 0) return statusDelta;
    return right.uptimePct - left.uptimePct;
  });

  const averageUptime = Math.round((monitors.reduce((sum, monitor) => sum + monitor.uptimePct, 0) / Math.max(monitors.length, 1)) * 10) / 10;
  const healthyMonitors = monitors.filter((monitor) => monitor.status === 'healthy').length;

  return {
    averageUptime,
    healthyMonitors,
    rows: sortedMonitors.map((monitor) => ({
      name: monitor.name,
      route: monitor.route,
      statusLabel: monitor.status,
      latencyLabel: `${monitor.latencyMs}ms`,
      owner: monitor.owner,
      checkCadence: `Checks every ${monitor.checkEveryMinutes} min`,
      alertLevel: monitor.status === 'down' ? 'urgent' : monitor.status === 'degraded' ? 'watch' : 'green',
    })),
  };
}

export function buildSubscriberBoard(subscribers: SubscriberSegment[]): SubscriberBoard {
  const totalSubscribers = subscribers.reduce((total, segment) => total + segment.count, 0);
  const primarySegment = [...subscribers].sort((left, right) => right.count - left.count)[0]?.name ?? 'None';
  const channelSummary = subscribers
    .map((segment) => `${segment.name}: ${segment.count} via ${segment.channel} (${segment.delivery})`)
    .join(' · ');

  return {
    totalSubscribers,
    primarySegment,
    channelSummary,
    messageDraft: 'Draft incident updates once and send them to the right audience with the right channel rules.',
    segments: subscribers,
  };
}

export function buildSettingsBoard(settings: StatusDeskSettings): SettingsBoard {
  const sections = [
    {
      title: 'Domain and branding',
      items: [
        settings.customDomainConnected ? 'Custom domain connected' : 'Connect the custom domain',
        `Brand: ${settings.brandName}`,
        `Accent color: ${settings.accentColor}`,
      ],
      status: settings.customDomainConnected ? 'complete' : 'needs attention',
    },
    {
      title: 'Notifications',
      items: [
        `Reply-to address: ${settings.replyToEmail}`,
        `Quiet hours: ${settings.quietHours}`,
        `Subscriber digest: ${settings.digestDay}`,
      ],
      status: settings.notificationEmailReady ? 'complete' : 'needs attention',
    },
    {
      title: 'Retention and cadence',
      items: [
        `Auto-archive after ${settings.autoArchiveDays} days`,
        'Incident templates are ready',
        'Public page copy is approved',
      ],
      status: 'complete',
    },
  ] as const;

  return {
    publicDomain: settings.publicDomain,
    readyToPublish: settings.customDomainConnected && settings.notificationEmailReady,
    sections: [...sections],
  };
}
