import { sampleMonitors } from '../../../lib/product';

export default function MonitorsPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Monitors</p>
        <h1>Know what is healthy before your customers do.</h1>
        <p className="lead">A simple monitor board for APIs, app surfaces, and billing integrations.</p>
      </section>

      <section className="card">
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
                <td><strong>{monitor.name}</strong></td>
                <td>{monitor.status}</td>
                <td>{monitor.uptimePct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
