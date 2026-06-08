import Link from 'next/link';
import { withBasePath } from "@/lib/site-path";

export default function LoginPage() {
  return (
    <main className="shell">
      <section className="frame hero">
        <p className="eyebrow">Sign in</p>
        <h1>Enter the incident desk.</h1>
        <p className="lead">Use the internal workspace to manage monitors, incidents, and subscriber updates.</p>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <label className="card" style={{ padding: 16 }}>
            <p className="kicker">Email</p>
            <input className="input" placeholder="founder@yourcompany.com" />
          </label>
          <label className="card" style={{ padding: 16 }}>
            <p className="kicker">Password</p>
            <input className="input" placeholder="••••••••" type="password" />
          </label>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <Link className="button" href={withBasePath('/app')}>
            Continue
          </Link>
          <Link className="ghost" href={withBasePath('/')}>
            Back to marketing site
          </Link>
        </div>
      </section>
    </main>
  );
}
