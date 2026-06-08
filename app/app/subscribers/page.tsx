import { buildSubscriberBoard, sampleSubscribers } from '../../../lib/status-desk';

const subscriberBoard = buildSubscriberBoard(sampleSubscribers);

export default function SubscribersPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Subscribers</p>
        <h1>Keep customers informed without manual chaos.</h1>
        <p className="lead">
          Build segments, preview delivery channels, and keep a clear audit trail for every update that goes out.
        </p>
      </section>

      <section className="grid cols-3">
        <article className="card">
          <p className="kicker">Audience size</p>
          <h2>{subscriberBoard.totalSubscribers}</h2>
          <p className="muted">Subscribed contacts across all segments.</p>
        </article>
        <article className="card">
          <p className="kicker">Primary segment</p>
          <h2>{subscriberBoard.primarySegment}</h2>
          <p className="muted">The biggest group to receive every incident update first.</p>
        </article>
        <article className="card">
          <p className="kicker">Channel plan</p>
          <h2>Email + SMS</h2>
          <p className="muted">Use email for broad updates and SMS for the escalation team.</p>
        </article>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Subscriber segments</p>
          <div className="stack-list">
            {subscriberBoard.segments.map((segment) => (
              <div key={segment.name} className="stack-item">
                <div>
                  <strong>{segment.name}</strong>
                  <p className="muted">{segment.source}</p>
                </div>
                <span className="status-chip status-green">
                  {segment.count} · {segment.channel} · {segment.delivery}
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <p className="kicker">Message workflow</p>
          <h2>Draft once, then route by urgency.</h2>
          <p className="muted">{subscriberBoard.messageDraft}</p>
          <div className="divider" />
          <ul className="checklist compact">
            <li>Instant alerts for active incidents</li>
            <li>Digest emails for non-critical updates</li>
            <li>Escalation SMS for the internal ops team</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
