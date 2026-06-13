import { asset } from "@/lib/basePath";

export default function AboutSection() {
  return (
    <section className="glass-card section" aria-labelledby="about-heading">
      <span className="section-eyebrow">01 — About</span>
      <h2 id="about-heading" className="section-heading">
        About Me
      </h2>

      <div className="about-intro">
        {/* Plain <img> + asset(): next/image with `unoptimized` export does not
            prepend basePath, so the file 404s under /Web_Portfolio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/RESUME_PHOTO.png")}
          alt="Liam Sango"
          width={200}
          height={200}
          className="about-photo"
        />
        <div className="prose">
          <p>
            Hello, I&apos;m Liam — a 17-year-old high school student aspiring to
            a role in offensive cybersecurity.
          </p>
          <p>
            Most of what I&apos;ve learned so far has come from building things
            from the ground up. I intentionally chose C as my first real
            programming language in order to get a very good understanding of
            programming in its oldest and purest form.
          </p>
          <p>
            Over the last six to eight months I&apos;ve built a small number of
            C-based projects that have slowly increased in complexity.
          </p>
          <p>
            Over the next six months I intend to build my most complex project
            yet: the Weaver framework. It&apos;s intended to be a resume piece
            designed to show my strengths in cybersecurity architecture and
            cryptographic systems design — demonstrating two novel offensive
            systems alongside a defensive framework built to counter the methods
            I put into practice.
          </p>
          <p>
            This website was built with Claude Code so I could get better
            experience with AI coding tools, given their relevance in the
            current job market. All my other projects were done with light AI
            assistance, with most of the code written completely by hand.
          </p>
        </div>
      </div>
    </section>
  );
}
