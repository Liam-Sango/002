export default function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="site-container">
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">📋 About Me</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <h2 id="about-heading" className="section-title">
              About Me
            </h2>

            <p>
              I&apos;m a passionate full-stack developer with over five years of
              experience building modern web applications. I specialize in
              crafting clean, performant user interfaces backed by robust,
              scalable server-side systems. My work sits at the intersection of
              thoughtful design and pragmatic engineering — I care as much about
              the pixels a user sees as I do about the database queries
              powering them.
            </p>

            <p style={{ marginTop: "0.75rem" }}>
              My core toolkit includes React, Next.js, TypeScript, Node.js, and
              PostgreSQL. I&apos;m equally comfortable wiring up RESTful APIs,
              designing relational data models, and sweating the details on a
              CSS grid. I&apos;ve shipped features used by thousands of daily
              active users, contributed to open-source projects, and led
              architectural reviews that saved teams from costly rewrites down
              the line.
            </p>

            <p style={{ marginTop: "0.75rem" }}>
              Before transitioning fully to the web, I cut my teeth on embedded
              systems and desktop application development — experiences that
              instilled a deep appreciation for performance constraints and
              resource-conscious design. That background still shapes how I
              write code today: I reach for simplicity first, layer in
              complexity only when it earns its keep, and measure before I
              optimize.
            </p>

            <p style={{ marginTop: "0.75rem" }}>
              When I&apos;m not behind a keyboard, you&apos;ll find me
              tinkering with retro hardware, contributing to open-source
              projects, or writing about the tools and patterns I&apos;ve come
              to rely on. I believe the best engineers are the ones who never
              stop learning — so I make it a point to explore unfamiliar
              territory regularly, whether that&apos;s a new language, a
              different paradigm, or a domain far outside my comfort zone.
            </p>

            <p style={{ marginTop: "0.75rem" }}>
              I&apos;m currently open to freelance and full-time opportunities
              where I can bring a product-minded approach to an engineering
              team. If you&apos;re building something ambitious and need someone
              who can contribute across the stack — from architecture sketches
              to polished UI — I&apos;d love to hear from you.
            </p>

            <div className="resume-download">
              <a href="/resume.pdf" className="win-btn" download>
                📄 Download Resume
              </a>
              <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--win-button-shadow)" }}>
                PDF &middot; last updated June 2026
              </p>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">Ready</p>
            <p className="status-bar-field">About Me</p>
          </div>
        </div>
      </div>
    </section>
  );
}
