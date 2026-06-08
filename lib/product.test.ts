import { describe, expect, it } from 'vitest';
import {
  buildIncidentBrief,
  buildPublicStatusCopy,
  buildStatusPageCopy,
  buildStatusSnapshot,
  formatStatusBoardName,
  sampleIncidents,
  sampleMonitors,
} from './product';

describe('buildStatusSnapshot', () => {
  it('summarizes uptime, incidents, and monitors into a clear status', () => {
    const snapshot = buildStatusSnapshot(sampleMonitors, sampleIncidents);

    expect(snapshot.overall).toBe('operational');
    expect(snapshot.monitorCount).toBe(3);
    expect(snapshot.activeIncidents).toBe(1);
    expect(snapshot.healthyMonitors).toBe(2);
  });
});

describe('buildIncidentBrief', () => {
  it('turns an incident into a public postmortem-ready brief', () => {
    const brief = buildIncidentBrief(sampleIncidents[0]);

    expect(brief.title).toContain('API latency');
    expect(brief.summary).toContain('customer-facing');
    expect(brief.timeline[0]).toContain('Detected');
    expect(brief.nextStep).toContain('follow-up');
  });
});

describe('buildPublicStatusCopy', () => {
  it('creates status page copy that sounds reassuring and specific', () => {
    const copy = buildPublicStatusCopy(sampleMonitors, sampleIncidents);

    expect(copy.headline).toContain('operational');
    expect(copy.cta).toContain('subscribe');
    expect(copy.badges.length).toBeGreaterThan(0);
  });
});

describe('formatStatusBoardName', () => {
  it('turns a slug into a customer-friendly board name', () => {
    expect(formatStatusBoardName('demo-saas')).toBe('Demo SaaS');
    expect(formatStatusBoardName('  billing-api  ')).toBe('Billing API');
    expect(formatStatusBoardName('')).toBe('Status Board');
  });
});

describe('buildStatusPageCopy', () => {
  it('adds a slug-aware title for public status pages', () => {
    const copy = buildStatusPageCopy('demo-saas', sampleMonitors, sampleIncidents);

    expect(copy.boardName).toBe('Demo SaaS');
    expect(copy.headline).toContain('Demo SaaS');
    expect(copy.body).toContain('tracking');
  });
});
