import { describe, expect, it } from 'vitest';
import {
  buildDeskSummary,
  buildIncidentWorkspace,
  buildMonitorBoard,
  buildSettingsBoard,
  buildSubscriberBoard,
  sampleIncidents,
  sampleMonitors,
  sampleSettings,
  sampleSubscribers,
} from './status-desk';

describe('buildDeskSummary', () => {
  it('summarizes the live workspace into a realistic operating state', () => {
    const summary = buildDeskSummary(sampleMonitors, sampleIncidents, sampleSubscribers);

    expect(summary.overallState).toBe('degraded');
    expect(summary.activeIncidents).toBe(1);
    expect(summary.monitorCount).toBe(3);
    expect(summary.subscriberCount).toBe(284);
    expect(summary.primaryAction).toContain('publish');
  });
});

describe('buildIncidentWorkspace', () => {
  it('turns an incident into a publish-ready work item', () => {
    const workspace = buildIncidentWorkspace(sampleIncidents[0]);

    expect(workspace.title).toContain('API latency spike');
    expect(workspace.audience).toContain('subscribers');
    expect(workspace.latestUpdate).toContain('Monitoring');
    expect(workspace.nextStep).toContain('healthy check window');
  });
});

describe('buildMonitorBoard', () => {
  it('orders monitors by risk so the broken surface is obvious first', () => {
    const board = buildMonitorBoard(sampleMonitors);

    expect(board.rows[0].name).toBe('Dashboard app');
    expect(board.rows[0].statusLabel).toBe('degraded');
    expect(board.rows[0].alertLevel).toBe('watch');
    expect(board.averageUptime).toBe(99.9);
  });
});

describe('buildSubscriberBoard', () => {
  it('rolls segment data into a practical messaging plan', () => {
    const board = buildSubscriberBoard(sampleSubscribers);

    expect(board.totalSubscribers).toBe(284);
    expect(board.primarySegment).toBe('All customers');
    expect(board.channelSummary).toContain('email');
    expect(board.messageDraft).toContain('incident updates');
  });
});

describe('buildSettingsBoard', () => {
  it('shows whether the status desk is ready to launch publicly', () => {
    const board = buildSettingsBoard(sampleSettings);

    expect(board.readyToPublish).toBe(true);
    expect(board.publicDomain).toBe('status.helioflow.dev');
    expect(board.sections[0].items).toContain('Custom domain connected');
  });
});
