export default function SettingsPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Settings</p>
        <h1>Brand the status page to match the product.</h1>
        <p className="lead">Keep the public page premium with domain, colors, and incident email templates.</p>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Branding</p>
          <ul className="list">
            <li>Logo upload</li>
            <li>Accent color</li>
            <li>Custom domain</li>
            <li>Footer trust copy</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Notifications</p>
          <ul className="list">
            <li>Incident start email</li>
            <li>Resolution email</li>
            <li>Subscriber digest</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
