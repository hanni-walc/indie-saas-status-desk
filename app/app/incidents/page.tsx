import { buildIncidentWorkspace, sampleIncidents } from '../../../lib/status-desk';

export default function IncidentsPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Incidents</p>
        <h1>Publish updates that are calm, clear, and credible.</h1>
        <p className="lead">
          Each incident becomes a structured timeline, a customer-facing summary, and a next step the team can actually
          execute.
        </p>
      </section>

      <section className="grid cols-2">
        {sampleIncidents.map((incident) => {
          const workspace = buildIncidentWorkspace(incident);
          return (
            <article key={incident.id} className="card">
              <div className="stack-item">
                <div>
                  <p className="kicker">{incident.severity}</p>
                  <h2>{workspace.title}</h2>
                </div>
                <span className={`status-chip status-${workspace.publishState === 'ready' ? 'green' : 'watch'}`}>
                  {workspace.publishState}
                </span>
              </div>
              <p className="muted">{incident.summary}</p>
              <p className="muted">Audience: {workspace.audience}</p>
              <p className="muted">{workspace.latestUpdate}</p>
              <div className="divider" />
              <ul className="timeline">
                {workspace.timeline.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="muted">Next step: {workspace.nextStep}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
