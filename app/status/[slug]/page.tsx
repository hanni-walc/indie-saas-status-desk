import type { Metadata } from 'next';
import {
  buildIncidentBrief,
  buildStatusPageCopy,
  buildStatusSnapshot,
  sampleIncidents,
  sampleMonitors,
} from '../../../lib/product';

type PublicStatusPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PublicStatusPageProps): Promise<Metadata> {
  const { slug } = await params;
  const copy = buildStatusPageCopy(slug, sampleMonitors, sampleIncidents);

  return {
    title: `${copy.boardName} status`,
    description: copy.body,
  };
}

export default async function PublicStatusPage({ params }: PublicStatusPageProps) {
  const { slug } = await params;
  const copy = buildStatusPageCopy(slug, sampleMonitors, sampleIncidents);
  const snapshot = buildStatusSnapshot(sampleMonitors, sampleIncidents);
  const activeIncident = sampleIncidents.find((incident) => incident.status !== 'resolved');
  const incidentBrief = activeIncident ? buildIncidentBrief(activeIncident) : null;

  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Public status</p>
        <h1>{copy.headline}</h1>
        <p className="lead">
          A customer-facing status page for {copy.boardName} that stays calm, honest, and easy to scan on mobile.
        </p>
        <div className="row">
          <span className="pill">Slug: {copy.slug}</span>
          <span className="pill">{snapshot.overall}</span>
          <span className="pill">{snapshot.uptimeAverage.toFixed(2)}% uptime</span>
        </div>
      </section>

      <section className="grid cols-3">
        <article className="card">
          <p className="kicker">Status summary</p>
          <p className="muted">{copy.body}</p>
        </article>
        <article className="card">
          <p className="kicker">Trust signals</p>
          <div>
            {copy.badges.map((badge) => (
              <span key={badge} className="pill">
                {badge}
              </span>
            ))}
          </div>
        </article>
        <article className="card">
          <p className="kicker">Next action</p>
          <h2>{copy.cta}</h2>
          <p className="muted">Customers can subscribe once and get every future incident update.</p>
        </article>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <article className="card">
          <p className="kicker">Monitors</p>
          <table className="table">
            <thead>
              <tr>
                <th>Monitor</th>
                <th>Status</th>
                <th>Uptime</th>
              </tr>
            </thead>
            <tbody>
              {sampleMonitors.map((monitor) => (
                <tr key={monitor.name}>
                  <td>
                    <strong>{monitor.name}</strong>
                  </td>
                  <td>{monitor.status}</td>
                  <td>{monitor.uptimePct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="card">
          <p className="kicker">Current incident</p>
          {incidentBrief ? (
            <>
              <h2>{incidentBrief.title}</h2>
              <p className="muted">{incidentBrief.summary}</p>
              <ul className="list">
                {incidentBrief.timeline.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="muted">{incidentBrief.nextStep}</p>
            </>
          ) : (
            <p className="muted">No active incidents right now.</p>
          )}
        </article>
      </section>
    </main>
  );
}
