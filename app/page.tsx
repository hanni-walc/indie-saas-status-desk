import Link from 'next/link';
import {
  buildPublicStatusCopy,
  buildStatusSnapshot,
  sampleIncidents,
  sampleMonitors,
  PROMISE,
  BUYER,
  WEDGE,
  LAUNCH,
  V2,
} from '../lib/product';
import { withBasePath } from "@/lib/site-path";

const snapshot = buildStatusSnapshot(sampleMonitors, sampleIncidents);
const copy = buildPublicStatusCopy(sampleMonitors, sampleIncidents);

export default function HomePage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Indie SaaS Status + Incident Desk</p>
        <h1>{PROMISE}</h1>
        <p className="lead">
          {WEDGE} Built for {BUYER} who want a status page that looks trustworthy on day one.
        </p>
        <div className="row">
          <Link className="button" href={withBasePath('/app')}>
            Open dashboard
          </Link>
          <Link className="ghost" href={withBasePath('/status/demo-saas')}>
            View public status page
          </Link>
        </div>
      </section>

      <section className="grid cols-3">
        <article className="card">
          <p className="kicker">System state</p>
          <h2>{snapshot.overall}</h2>
          <p className="muted">{copy.body}</p>
        </article>
        <article className="card">
          <p className="kicker">Trust signals</p>
          <h2>{snapshot.healthyMonitors}/{snapshot.monitorCount} monitors healthy</h2>
          <p className="muted">{snapshot.uptimeAverage.toFixed(2)}% average uptime</p>
        </article>
        <article className="card">
          <p className="kicker">Active work</p>
          <h2>{snapshot.activeIncidents} incident{snapshot.activeIncidents === 1 ? '' : 's'}</h2>
          <p className="muted">Subscriber updates and postmortems are ready to publish.</p>
        </article>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <article className="card">
          <p className="kicker">Why teams buy</p>
          <ul className="list">
            <li>Public status pages with a polished, branded first impression.</li>
            <li>Incident drafts that read like a real operations team wrote them.</li>
            <li>Monitors, subscribers, and postmortems in one clear workflow.</li>
          </ul>
        </article>
        <article className="card">
          <p className="kicker">Launch checklist</p>
          <ul className="list">
            {LAUNCH.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <article className="card">
          <p className="kicker">What ships in v1</p>
          <div>{copy.badges.map((badge) => <span key={badge} className="pill">{badge}</span>)}</div>
        </article>
        <article className="card">
          <p className="kicker">Future expansion</p>
          <div>{V2.map((item) => <span key={item} className="pill">{item}</span>)}</div>
        </article>
      </section>
    </main>
  );
}
