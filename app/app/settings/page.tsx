import { buildSettingsBoard, sampleSettings } from '../../../lib/status-desk';

const settingsBoard = buildSettingsBoard(sampleSettings);

export default function SettingsPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Settings</p>
        <h1>Brand the status page to match the product.</h1>
        <p className="lead">
          Configure the public domain, incident email identity, and the small details that make the desk feel premium.
        </p>
      </section>

      <section className="grid cols-2">
        {settingsBoard.sections.map((section) => (
          <article key={section.title} className="card">
            <div className="stack-item">
              <div>
                <p className="kicker">{section.title}</p>
                <h2>{section.status === 'complete' ? 'Ready to ship' : 'Needs attention'}</h2>
              </div>
              <span className={`status-chip status-${section.status === 'complete' ? 'green' : 'watch'}`}>
                {section.status}
              </span>
            </div>
            <ul className="list compact">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Public status</p>
          <h2>{settingsBoard.publicDomain}</h2>
          <p className="muted">Custom domain is ready to receive traffic.</p>
          <div className="mini-card">
            <p className="kicker">Publish readiness</p>
            <strong>{settingsBoard.readyToPublish ? 'Ready' : 'Incomplete'}</strong>
            <p className="muted">Make sure the notification email and domain are both connected before launch.</p>
          </div>
        </article>
        <article className="card">
          <p className="kicker">Operational guardrails</p>
          <ul className="checklist compact">
            <li>Quiet hours: {sampleSettings.quietHours}</li>
            <li>Digest day: {sampleSettings.digestDay}</li>
            <li>Auto-archive incidents after {sampleSettings.autoArchiveDays} days</li>
            <li>Reply-to email: {sampleSettings.replyToEmail}</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
