export default function RoutePage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Route</p>
        <h1>Page scaffold</h1>
        <p className="lead">This route exists so the repo is structurally complete and ready for a real backend implementation.</p>
        <div className="row">
          <a className="button" href="/app">Back to dashboard</a>
          <a className="ghost" href="/">Open landing page</a>
        </div>
      </section>
      <section className="card">
        <p className="kicker">Implementation note</p>
        <p className="muted">Replace this scaffold with route-specific behavior, forms, or detail views as the product is implemented.</p>
      </section>
    </main>
  );
}
