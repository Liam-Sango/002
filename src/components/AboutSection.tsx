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
            prepend basePath, so the file 404s under /002. */}
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
            Hello, I&apos;m Liam — a 17-year-old aspiring cybersecurity
            professional from Australia. I&apos;m studying a Certificate III in
            Information Technology at Ringwood Training while finishing high
            school at Croydon Community High School.
          </p>
          <p>
            Most of what I know I&apos;ve learned by building. I write small
            tools in C and Python — a Caesar cipher, a terminal tic-tac-toe, a
            username generator — and I&apos;m currently working on Weaver, a set
            of offensive- and defensive-security projects that includes a
            stack-based bytecode VM and assembler. Figuring out how systems
            work, and how they break, is the part I enjoy most.
          </p>
          <p>
            I learn best by reading code, asking why it works, and rebuilding it
            myself — this site included. I&apos;m always looking for the next
            thing to take apart and understand.
          </p>
        </div>
      </div>
    </section>
  );
}
