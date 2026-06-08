import Link from 'next/link';
import { withBasePath } from '@/lib/site-path';
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
} from '../lib/status-desk';

const summary = buildDeskSummary(sampleMonitors, sampleIncidents, sampleSubscribers);
const monitorBoard = buildMonitorBoard(sampleMonitors);
const subscriberBoard = buildSubscriberBoard(sampleSubscribers);
const settingsBoard = buildSettingsBoard(sampleSettings);
const activeIncident = sampleIncidents.find((incident) => incident.status !== 'resolved') ?? sampleIncidents[0];
const incidentWorkspace = buildIncidentWorkspace(activeIncident);

function overallStateChip(state: typeof summary.overallState) {
  if (state === 'operational') return 'green';
  if (state === 'degraded') return 'watch';
  return 'urgent';
}

export default function HomePage() {
  return (
    <main className="shell page-stack">
      <header className="topbar frame">
        <Link className="brand" href={withBasePath('/')}>
          <span className="brand-mark">H</span>
          <span>
            <strong>HelioFlow Status Desk</strong>
            <span>Incident workflows that look polished on day one.</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href={withBasePath('/app')}>Dashboard</Link>
          <Link href={withBasePath('/app/incidents')}>Incidents</Link>
          <Link href={withBasePath('/status/all-systems-go')}>Public status</Link>
        </nav>
      </header>

      <section className="hero-grid">
        <div className="frame hero hero-copy">
          <p className="eyebrow">Indie SaaS Status + Incident Desk</p>
          <h1>Launch a status page customers trust and ops can actually run.</h1>
          <p className="lead">
            HelioFlow bundles monitors, incident publishing, subscriber updates, and brand controls into one
            deployable product slice for founders who need a real operational workflow—not a mockup.
          </p>
          <div className="row">
            <Link className="button" href={withBasePath('/app')}>
              Open workspace
            </Link>
            <Link className="ghost" href={withBasePath('/status/all-systems-go')}>
              View public status page
            </Link>
          </div>
          <div className="chip-row" aria-label="Trust signals">
            <span className="pill">{summary.overallState}</span>
            <span className="pill">{summary.averageUptime}% average uptime</span>
            <span className="pill">{summary.subscriberCount} subscribers</span>
            <span className="pill">Custom domain ready</span>
          </div>
        </div>

        <aside className="frame preview-card">
          <div className="preview-header">
            <div>
              <p className="kicker">Live snapshot</p>
              <h2>{summary.headline}</h2>
            </div>
            <span className={`status-chip status-${overallStateChip(summary.overallState)}`}>{summary.overallState}</span>
          </div>
          <div className="metric-grid">
            <article className="metric-card">
              <strong>{summary.monitorCount}</strong>
              <span>monitors</span>
            </article>
            <article className="metric-card">
              <strong>{summary.healthyMonitors}</strong>
              <span>healthy</span>
            </article>
            <article className="metric-card">
              <strong>{summary.activeIncidents}</strong>
              <span>active incidents</span>
            </article>
            <article className="metric-card">
              <strong>{summary.subscriberCount}</strong>
              <span>subscribers</span>
            </article>
          </div>
          <div className="mini-card">
            <p className="kicker">Next action</p>
            <p>{summary.primaryAction}</p>
          </div>
          <div className="mini-card">
            <p className="kicker">Current incident</p>
            <strong>{incidentWorkspace.title}</strong>
            <p className="muted">{incidentWorkspace.latestUpdate}</p>
          </div>
        </aside>
      </section>

      <section className="grid cols-3">
        <article className="card">
          <p className="kicker">Why teams buy</p>
          <h2>Operational credibility from the first deploy.</h2>
          <ul className="list">
            <li>Public pages with clear language, clean uptime stats, and a calm incident tone.</li>
            <li>Internal dashboards for monitors, subscribers, and incident draft publishing.</li>
            <li>Settings that make the product feel like a real SaaS, not a template.</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Monitoring workflow</p>
          <h2>Know what is failing before customers do.</h2>
          <div className="stack-list">
            {monitorBoard.rows.map((row) => (
              <div key={row.name} className="stack-item">
                <div>
                  <strong>{row.name}</strong>
                  <p className="muted">{row.route} · {row.owner}</p>
                </div>
                <span className={`status-chip status-${row.alertLevel}`}>{row.statusLabel}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <p className="kicker">Subscriber flow</p>
          <h2>Send updates to the right audience.</h2>
          <p className="muted">{subscriberBoard.messageDraft}</p>
          <div className="divider" />
          <p className="muted">Primary segment: <strong>{subscriberBoard.primarySegment}</strong></p>
          <p className="muted">{subscriberBoard.channelSummary}</p>
        </article>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Settings</p>
          <h2>Branding and notifications that ship together.</h2>
          {settingsBoard.sections.map((section) => (
            <div key={section.title} className="settings-block">
              <div className="stack-item">
                <strong>{section.title}</strong>
                <span className={`status-chip status-${section.status === 'complete' ? 'green' : 'watch'}`}>{section.status}</span>
              </div>
              <ul className="list compact">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
        <article className="card">
          <p className="kicker">Launch checklist</p>
          <h2>Everything needed to go public.</h2>
          <ul className="checklist">
            <li>Connect a custom status domain</li>
            <li>Set incident email templates and quiet hours</li>
            <li>Confirm monitors are reporting on a real schedule</li>
            <li>Invite subscribers and verify digest delivery</li>
          </ul>
          <div className="row">
            <Link className="button" href={withBasePath('/login')}>
              Sign in
            </Link>
            <Link className="ghost" href={withBasePath('/app/settings')}>
              Review settings
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
