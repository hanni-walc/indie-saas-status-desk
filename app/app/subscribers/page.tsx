export default function SubscribersPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Subscribers</p>
        <h1>Keep customers informed without manual chaos.</h1>
        <p className="lead">A simple subscriber workflow for founders who need trustworthy incident email updates.</p>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Subscriber groups</p>
          <ul className="list">
            <li>All customers</li>
            <li>Enterprise contacts</li>
            <li>Status page watchers</li>
            <li>Internal ops team</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Delivery settings</p>
          <ul className="list">
            <li>Email only for v1</li>
            <li>Custom domain support</li>
            <li>Quiet hours for non-critical alerts</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
