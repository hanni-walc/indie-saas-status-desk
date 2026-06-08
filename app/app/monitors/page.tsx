import { buildMonitorBoard, sampleMonitors } from '../../../lib/status-desk';

const monitorBoard = buildMonitorBoard(sampleMonitors);

export default function MonitorsPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Monitors</p>
        <h1>Know what is healthy before your customers do.</h1>
        <p className="lead">
          Monitor checks capture uptime, latency, cadence, and ownership so the next incident starts with facts.
        </p>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Board metrics</p>
          <div className="metric-grid">
            <article className="metric-card">
              <strong>{monitorBoard.averageUptime}%</strong>
              <span>average uptime</span>
            </article>
            <article className="metric-card">
              <strong>{monitorBoard.healthyMonitors}</strong>
              <span>healthy monitors</span>
            </article>
            <article className="metric-card">
              <strong>{sampleMonitors.length}</strong>
              <span>total checks</span>
            </article>
          </div>
        </article>
        <article className="card">
          <p className="kicker">What this catches</p>
          <ul className="checklist compact">
            <li>API degradation before it turns into an outage</li>
            <li>Billing webhook lag that needs a quick follow-up</li>
            <li>Dashboard latency spikes that deserve a public note</li>
          </ul>
        </article>
      </section>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Monitor</th>
              <th>Status</th>
              <th>Latency</th>
              <th>Owner</th>
              <th>Cadence</th>
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
                <td>{monitor.owner}</td>
                <td>{monitor.checkCadence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
