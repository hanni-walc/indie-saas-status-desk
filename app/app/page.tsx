import Link from 'next/link';
import { withBasePath } from '@/lib/site-path';
import {
  buildDeskSummary,
  buildIncidentWorkspace,
  buildMonitorBoard,
  buildSubscriberBoard,
  sampleIncidents,
  sampleMonitors,
  sampleSubscribers,
} from '../../lib/status-desk';

const summary = buildDeskSummary(sampleMonitors, sampleIncidents, sampleSubscribers);
const monitorBoard = buildMonitorBoard(sampleMonitors);
const subscriberBoard = buildSubscriberBoard(sampleSubscribers);
const activeIncident = sampleIncidents.find((incident) => incident.status !== 'resolved') ?? sampleIncidents[0];
const incidentWorkspace = buildIncidentWorkspace(activeIncident);

export default function DashboardPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Dashboard</p>
        <h1>Run the incident desk without chaos.</h1>
        <p className="lead">
          Track monitor health, publish incident updates, and keep subscribers informed from a single workspace.
        </p>
        <div className="row">
          <Link className="button" href={withBasePath('/app/incidents')}>
            Review incidents
          </Link>
          <Link className="ghost" href={withBasePath('/app/monitors')}>
            Check monitors
          </Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><strong>{summary.overallState}</strong><span className="muted">system state</span></div>
        <div className="stat"><strong>{summary.monitorCount}</strong><span className="muted">monitors</span></div>
        <div className="stat"><strong>{summary.healthyMonitors}</strong><span className="muted">healthy</span></div>
        <div className="stat"><strong>{summary.subscriberCount}</strong><span className="muted">subscribers</span></div>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Today</p>
          <h2>{summary.headline}</h2>
          <ul className="list">
            <li>{summary.primaryAction}</li>
            <li>Verify the public status page reflects the latest incident state.</li>
            <li>Send the subscriber follow-up after the healthy check window closes.</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Operations</p>
          <div className="chip-row">
            <span className="pill">incident triage</span>
            <span className="pill">status publishing</span>
            <span className="pill">subscriber updates</span>
            <span className="pill">postmortem archive</span>
          </div>
          <div className="divider" />
          <p className="muted">Current incident: <strong>{incidentWorkspace.title}</strong></p>
          <p className="muted">{incidentWorkspace.latestUpdate}</p>
        </article>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Monitor board</p>
          <div className="stack-list">
            {monitorBoard.rows.map((row) => (
              <div key={row.name} className="stack-item">
                <div>
                  <strong>{row.name}</strong>
                  <p className="muted">{row.route} · {row.checkCadence}</p>
                </div>
                <span className={`status-chip status-${row.alertLevel}`}>{row.latencyLabel}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <p className="kicker">Subscribers</p>
          <h2>{subscriberBoard.totalSubscribers} contacts ready for updates.</h2>
          <p className="muted">Primary segment: {subscriberBoard.primarySegment}</p>
          <p className="muted">{subscriberBoard.channelSummary}</p>
          <div className="mini-card">
            <p className="kicker">Drafting tip</p>
            <p>{subscriberBoard.messageDraft}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
