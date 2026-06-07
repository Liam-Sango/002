import { asset } from "@/lib/basePath";

export default function HeroSection() {
  return (
    <section className="glass-card hero" aria-labelledby="hero-heading">
      <span className="hero-kanji" aria-hidden="true">
        操縦者
      </span>
      <span className="hero-greeting">Hi, my name is</span>

      <h1 id="hero-heading" className="hero-title">
        <span className="grad">Liam Sango</span>
        <span className="caret" aria-hidden="true" />
      </h1>

      <p className="hero-role">
        I build <span className="grad">fast, thoughtful</span> web apps.
      </p>

      <p className="hero-lead">
        Full-stack developer with a product mindset — equally at home designing
        a relational data model, wiring up a real-time API, or sweating the
        details on a CSS grid. I care as much about the pixels you see as the
        queries behind them.
      </p>

      <div className="btn-row">
        <a href="#projects" className="btn btn--primary">
          View Projects →
        </a>
        <a href={asset("/resume.pdf")} className="btn btn--ghost" download>
          Download Résumé
        </a>
        <a href="#contact" className="btn btn--ghost">
          Get in Touch
        </a>
      </div>

      <div className="hero-gauge" aria-hidden="true">
        <span className="gauge-label">SYNCHRO RATIO</span>
        <span className="gauge-track">
          <span className="gauge-fill" />
        </span>
        <span className="gauge-val">100.0%</span>
      </div>

      <div className="hero-gauge" aria-hidden="true">
        <span className="gauge-label">SYNCHRO RATIO</span>
        <span className="gauge-track">
          <span className="gauge-fill" />
        </span>
        <span className="gauge-val">100.0%</span>
      </div>

      <div className="hero-meta">
        <span>
          <span className="status-dot" aria-hidden="true" /> Available for new
          work
        </span>
        <span>📍 Remote · Australia</span>
      </div>
    </section>
  );
}
