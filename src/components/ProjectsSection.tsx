import Link from "next/link";
import projects from "@/data/projects";
import { formatMonth } from "@/lib/site";

export default function ProjectsSection() {
  return (
    <section className="glass-card section" aria-labelledby="projects-heading">
      <span className="section-eyebrow">04 — Projects</span>
      <h2 id="projects-heading" className="section-heading">
        Things I&apos;ve Built
      </h2>
      <p className="section-intro">
        A selection of projects I&apos;ve designed and shipped. Each one taught
        me something I carried into the next.
      </p>

      {projects.length === 0 ? (
        <p className="empty-state">Projects coming soon.</p>
      ) : (
        <div className="card-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div>
                <h3>{project.title}</h3>
                <p className="card-meta">{formatMonth(project.date)}</p>
              </div>
              <p>{project.description}</p>
              <div className="badge-row">
                {project.tech.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>
              <div className="card-links">
                <Link
                  href={`/projects/${project.id}`}
                  className="btn btn--primary"
                >
                  Case study →
                </Link>
                <a
                  href={project.github}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="btn btn--ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
