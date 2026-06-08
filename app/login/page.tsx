import Link from 'next/link';
import { withBasePath } from '@/lib/site-path';

export default function LoginPage() {
  return (
    <main className="shell page-stack">
      <section className="frame hero">
        <p className="eyebrow">Sign in</p>
        <h1>Enter the incident desk.</h1>
        <p className="lead">
          Use the internal workspace to manage monitors, publish incident notes, and keep the subscriber list aligned.
        </p>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <p className="kicker">Login</p>
          <label className="field">
            <span>Email</span>
            <input className="input" placeholder="founder@helioflow.dev" />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" placeholder="••••••••" type="password" />
          </label>
          <div className="row">
            <Link className="button" href={withBasePath('/app')}>
              Continue
            </Link>
            <Link className="ghost" href={withBasePath('/')}>
              Back to marketing site
            </Link>
          </div>
        </article>
        <article className="card">
          <p className="kicker">Access notes</p>
          <ul className="checklist compact">
            <li>Founders and operators share the same workspace</li>
            <li>Public status pages stay separate from internal triage</li>
            <li>Every incident update can be repurposed into a postmortem</li>
          </ul>
          <div className="mini-card">
            <p className="kicker">Ready for demo</p>
            <p>Log in, open the dashboard, and review the active incident flow.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
