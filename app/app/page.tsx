import { buildStatusSnapshot, sampleIncidents, sampleMonitors } from '../../lib/product';
import { withBasePath } from "@/lib/site-path";

const snapshot = buildStatusSnapshot(sampleMonitors, sampleIncidents);

export default function DashboardPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Dashboard</p>
        <h1>Run the incident desk without chaos.</h1>
        <p className="lead">Track monitors, publish updates, and keep subscribers informed from one clean workspace.</p>
        <div className="row">
          <a className="button" href={withBasePath('/app/incidents')}>Review incidents</a>
          <a className="ghost" href={withBasePath('/app/monitors')}>Check monitors</a>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><strong>{snapshot.overall}</strong><span className="muted">system state</span></div>
        <div className="stat"><strong>{snapshot.monitorCount}</strong><span className="muted">monitors</span></div>
        <div className="stat"><strong>{snapshot.healthyMonitors}</strong><span className="muted">healthy</span></div>
        <div className="stat"><strong>{snapshot.activeIncidents}</strong><span className="muted">active incidents</span></div>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <article className="card">
          <p className="kicker">Today</p>
          <h2>One active incident, one resolved postmortem.</h2>
          <ul className="list">
            <li>Open the latest incident update.</li>
            <li>Verify the public status page is still honest.</li>
            <li>Send the next subscriber email once the window closes.</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Operations</p>
          <div>
            <span className="pill">incident triage</span>
            <span className="pill">status publishing</span>
            <span className="pill">subscriber updates</span>
            <span className="pill">postmortem archive</span>
          </div>
        </article>
      </section>
    </main>
  );
}
