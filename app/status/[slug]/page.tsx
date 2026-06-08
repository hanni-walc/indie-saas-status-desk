import { buildPublicStatusCopy, sampleIncidents, sampleMonitors } from '../../../lib/product';

const copy = buildPublicStatusCopy(sampleMonitors, sampleIncidents);

export default async function PublicStatusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Public status</p>
        <h1>{copy.headline}</h1>
        <p className="lead">A polished public surface for customers, prospects, and support teams.</p>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Status summary</p>
          <p className="muted">{copy.body}</p>
          <div>{copy.badges.map((badge) => <span key={badge} className="pill">{badge}</span>)}</div>
        </article>
        <article className="card">
          <p className="kicker">Next action</p>
          <h2>{copy.cta}</h2>
          <p className="muted">Board slug: {slug}</p>
        </article>
      </section>
    </main>
  );
}
