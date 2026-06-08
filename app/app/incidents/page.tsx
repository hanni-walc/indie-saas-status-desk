import { buildIncidentBrief, sampleIncidents } from '../../../lib/product';

export default function IncidentsPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Incidents</p>
        <h1>Publish updates that are calm, clear, and credible.</h1>
        <p className="lead">Each incident becomes a clean timeline with a next step, not a noisy support thread.</p>
      </section>

      <section className="grid cols-2">
        {sampleIncidents.map((incident) => {
          const brief = buildIncidentBrief(incident);
          return (
            <article key={incident.id} className="card">
              <p className="kicker">{incident.severity}</p>
              <h2>{brief.title}</h2>
              <p className="muted">{brief.summary}</p>
              <ul className="list">
                {brief.timeline.map((step) => <li key={step}>{step}</li>)}
              </ul>
              <p className="muted">{brief.nextStep}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
