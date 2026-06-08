export default function RoutePage({ params }: { params: { key?: string; slug?: string; id?: string } }) {
  const value = params.key ?? params.slug ?? params.id ?? "item";
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Route</p>
        <h1>{"app / settings"}</h1>
        <p className="lead">{"Placeholder page for /app/settings in the Indie SaaS Status + Incident Desk repo."}</p>
        <div className="row">
          <a className="button" href="/app">Back to dashboard</a>
          <span className="ghost">{value}</span>
        </div>
      </section>
      <section className="card">
        <p className="kicker">Implementation note</p>
        <p className="muted">This route exists so the repo is structurally complete and ready for a real backend implementation.</p>
      </section>
    </main>
  );
}
