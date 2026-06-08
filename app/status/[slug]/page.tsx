import type { Metadata } from 'next';
import {
  buildIncidentWorkspace,
  buildDeskSummary,
  buildMonitorBoard,
  buildSubscriberBoard,
  sampleIncidents,
  sampleMonitors,
  sampleSubscribers,
} from '../../../lib/status-desk';

type PublicStatusPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PublicStatusPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug.replace(/[-_]+/g, ' ')} status`,
    description: 'Live public incident updates with subscriber notifications and monitor health at a glance.',
  };
}

export function generateStaticParams() {
  return [{ slug: 'all-systems-go' }];
}

export default async function PublicStatusPage({ params }: PublicStatusPageProps) {
  const { slug } = await params;
  const summary = buildDeskSummary(sampleMonitors, sampleIncidents, sampleSubscribers);
  const monitorBoard = buildMonitorBoard(sampleMonitors);
  const subscriberBoard = buildSubscriberBoard(sampleSubscribers);
  const activeIncident = sampleIncidents.find((incident) => incident.status !== 'resolved');
  const incidentWorkspace = activeIncident ? buildIncidentWorkspace(activeIncident) : null;

  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Public status</p>
        <h1>{slug.replace(/[-_]+/g, ' ')} is {summary.overallState}</h1>
        <p className="lead">
          A customer-facing status page that stays calm, honest, and easy to scan on mobile. Subscribers can follow
          updates without emailing support.
        </p>
        <div className="chip-row">
          <span className="pill">{summary.averageUptime}% uptime</span>
          <span className="pill">{summary.activeIncidents} active incident</span>
          <span className="pill">{subscriberBoard.totalSubscribers} subscribers</span>
          <span className="pill">Slug: {slug}</span>
        </div>
      </section>

      <section className="grid cols-3">
        <article className="card">
          <p className="kicker">Status summary</p>
          <p className="muted">{summary.headline}</p>
        </article>
        <article className="card">
          <p className="kicker">Trust signals</p>
          <ul className="checklist compact">
            <li>{monitorBoard.healthyMonitors}/{monitorBoard.rows.length} monitors healthy</li>
            <li>{summary.averageUptime}% average uptime</li>
            <li>{subscriberBoard.primarySegment} gets instant updates</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Call to action</p>
          <h2>Subscribe for email alerts and incident updates.</h2>
          <p className="muted">The public page doubles as a trust-building conversion point.</p>
        </article>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Monitors</p>
          <table className="table">
            <thead>
              <tr>
                <th>Monitor</th>
                <th>Status</th>
                <th>Latency</th>
              </tr>
            </thead>
            <tbody>
              {monitorBoard.rows.map((monitor) => (
                <tr key={monitor.name}>
                  <td>
                    <strong>{monitor.name}</strong>
                    <p className="muted">{monitor.route}</p>
                  </td>
                  <td>
                    <span className={`status-chip status-${monitor.alertLevel}`}>{monitor.statusLabel}</span>
                  </td>
                  <td>{monitor.latencyLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="card">
          <p className="kicker">Current incident</p>
          {incidentWorkspace ? (
            <>
              <div className="stack-item">
                <div>
                  <h2>{incidentWorkspace.title}</h2>
                  <p className="muted">{incidentWorkspace.severityLabel}</p>
                </div>
                <span className={`status-chip status-${incidentWorkspace.publishState === 'ready' ? 'green' : 'watch'}`}>
                  {incidentWorkspace.publishState}
                </span>
              </div>
              <p className="muted">{incidentWorkspace.audience}</p>
              <p className="muted">{incidentWorkspace.latestUpdate}</p>
              <ul className="timeline">
                {incidentWorkspace.timeline.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="muted">{incidentWorkspace.nextStep}</p>
            </>
          ) : (
            <p className="muted">No active incidents right now.</p>
          )}
        </article>
      </section>
    </main>
  );
}
