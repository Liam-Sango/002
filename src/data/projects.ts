export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  liveUrl?: string;
  date: string; // ISO date
  content: string; // HTML case-study body for the project's full page
}

// ─────────────────────────────────────────────────────────────
// Sample data — replace these with your real projects.
// Each entry follows the `Project` shape above.
// ─────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "lumen-analytics",
    title: "Lumen Analytics",
    description:
      "A real-time analytics dashboard that ingests event streams and renders sub-second charts. Built around a columnar query layer and a websocket pipeline that keeps thousands of concurrent dashboards in sync without hammering the database.",
    tech: ["TypeScript", "Next.js", "Rust", "ClickHouse", "WebSockets"],
    github: "https://github.com/Liam-Sango/lumen-analytics",
    liveUrl: "https://lumen.example.com",
    date: "2026-04-12",
    content: `
      <p>Lumen Analytics answers a deceptively hard question: how do you show
      thousands of people a live view of the same firehose without melting the
      database or your servers? It ingests event streams, rolls them up
      continuously, and pushes sub-second updates to every open dashboard.</p>

      <h2>The problem</h2>
      <p>Customers wanted "real-time" dashboards over high-cardinality event
      data. The naïve version — every dashboard polling aggregate queries —
      buckled at a few hundred users. The database spent all its time
      re-computing answers that barely changed between requests.</p>

      <h2>How it works</h2>
      <ul>
        <li><strong>Columnar core.</strong> Events land in ClickHouse, where
        rollups over millions of rows return in milliseconds instead of seconds.</li>
        <li><strong>Rust fan-out service.</strong> A single subscriber computes
        each aggregate once, then fans the result out to every connected client —
        so a thousand identical dashboards cost one query, not a thousand.</li>
        <li><strong>WebSocket pipeline.</strong> Bounded per-connection queues
        with frame coalescing keep slow clients from dragging down the fleet.</li>
      </ul>

      <blockquote>p95 dashboard load dropped from ~2.5s to under 400ms after the
      aggregation moved into the columnar layer.</blockquote>

      <h2>What I'd revisit</h2>
      <p>The fan-out service is currently a single process per region. It's held
      up well, but the next step is sharding subscriptions by tenant so a noisy
      customer can never affect a quiet one. The groundwork — bounded queues and
      per-connection metrics — is already in place for it.</p>
    `,
  },
  {
    id: "driftwood-cms",
    title: "Driftwood CMS",
    description:
      "A git-backed headless CMS for static sites. Editors get a friendly block editor; everything commits straight to a repo as Markdown, so content stays versioned, reviewable, and free of vendor lock-in.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/Liam-Sango/driftwood-cms",
    liveUrl: "https://driftwood.example.com",
    date: "2026-01-28",
    content: `
      <p>Driftwood is a headless CMS that treats Git as the database. Editors get
      a friendly block editor; every save becomes a Markdown commit in a real
      repository. Content stays versioned, reviewable, and completely free of
      vendor lock-in.</p>

      <h2>Why git-backed</h2>
      <p>Most CMSs trap your content in a proprietary database behind an API. The
      day you want to leave, you're writing an export script. Driftwood inverts
      that: your content was never anywhere but your repo, in a format you can
      read without us.</p>

      <blockquote>If the CMS vanished tomorrow, every word you wrote would still
      be sitting in your repository as plain Markdown. That's the whole pitch.</blockquote>

      <h2>The interesting bits</h2>
      <ul>
        <li><strong>Block editor → Markdown.</strong> A WYSIWYG surface that
        serialises to clean, diff-friendly Markdown — no surprise HTML soup in
        your commits.</li>
        <li><strong>Pull-request workflow.</strong> Drafts open as branches, so
        publishing is a review and a merge. Editorial sign-off comes for free
        from the tools engineers already use.</li>
        <li><strong>Postgres as an index, not a source of truth.</strong> The
        database is a rebuildable cache over the repo, which keeps the data model
        honest.</li>
      </ul>

      <h2>Outcome</h2>
      <p>It started as a tool for my own sites and grew into the backbone for a
      handful of small teams who wanted Git's guarantees without asking their
      writers to learn Git.</p>
    `,
  },
  {
    id: "pixelforge",
    title: "PixelForge",
    description:
      "A browser-based sprite editor with onion-skin animation, palette cycling, and one-click export to spritesheets. Runs entirely client-side on a WebGL canvas — no uploads, no accounts, just open and draw.",
    tech: ["TypeScript", "WebGL", "Canvas", "Vite"],
    github: "https://github.com/Liam-Sango/pixelforge",
    date: "2025-10-05",
    content: `
      <p>PixelForge is a browser-based sprite editor for pixel artists and game
      developers. Onion-skin animation, palette cycling, and one-click
      spritesheet export — all running entirely client-side on a WebGL canvas.
      No uploads, no accounts, no server at all.</p>

      <h2>Local-first on purpose</h2>
      <p>Artists are protective of their work, and rightly so. PixelForge never
      sends a pixel anywhere: files live in your browser and export straight to
      disk. The upside beyond privacy is latency — every brush stroke is a local
      operation, so the tool feels instant.</p>

      <h2>Making the canvas fast</h2>
      <ul>
        <li><strong>WebGL, not 2D canvas.</strong> Layers render as textures, so
        compositing dozens of frames for onion-skinning stays smooth.</li>
        <li><strong>Palette cycling on the GPU.</strong> Classic colour-cycling
        animation is a shader uniform swap — effectively free.</li>
        <li><strong>Immutable history.</strong> Undo/redo is a stack of cheap
        diffs, which made implementing animation playback almost a side effect.</li>
      </ul>

      <blockquote>The whole app is a few hundred kilobytes and works offline once
      loaded — a single HTML file you could email to a friend.</blockquote>

      <h2>What I learned</h2>
      <p>Constraints breed clarity. Refusing to add a backend forced every feature
      to justify itself within the browser's sandbox, and the result is a tool
      that's smaller, faster, and more trustworthy than the "cloud" version I
      originally sketched.</p>
    `,
  },
  {
    id: "harbor-deploy",
    title: "Harbor",
    description:
      "A self-hostable deployment platform that turns any Dockerfile into a zero-downtime rolling deploy with a single command. Includes health-checked rollbacks, per-branch preview environments, and a slim CLI.",
    tech: ["Go", "Docker", "Kubernetes", "gRPC"],
    github: "https://github.com/Liam-Sango/harbor",
    liveUrl: "https://harbor.example.com",
    date: "2025-07-19",
    content: `
      <p>Harbor turns any Dockerfile into a zero-downtime rolling deploy with a
      single command. It's the self-hostable platform I wanted but couldn't buy:
      health-checked rollbacks, per-branch preview environments, and a CLI thin
      enough to live in muscle memory.</p>

      <h2>The pitch</h2>
      <p>Managed platforms are wonderful until you hit their pricing or their
      walls. Harbor gives a small team that same "git push and it's live"
      experience on infrastructure they own.</p>

      <pre><code>$ harbor deploy
→ building image ............ done
→ rolling out (3 replicas) .. healthy
→ live at https://app.example.com</code></pre>

      <h2>Design choices</h2>
      <ul>
        <li><strong>Go single binary.</strong> The whole control plane ships as
        one static binary — trivial to run, nothing to babysit.</li>
        <li><strong>Health-gated rollouts.</strong> New replicas must pass checks
        before old ones drain; a failed deploy rolls back automatically instead
        of paging someone.</li>
        <li><strong>Preview per branch.</strong> Every branch gets an ephemeral
        environment with its own URL, torn down when the branch merges.</li>
        <li><strong>gRPC between CLI and control plane</strong> for a typed,
        streaming command surface.</li>
      </ul>

      <blockquote>The goal was for a deploy to be so boring it stops being an
      event — just another step, like running tests.</blockquote>

      <h2>Status</h2>
      <p>Harbor runs the preview environments for several of my own projects. The
      roadmap is mostly about observability: surfacing deploy health and rollback
      history without bolting on a heavyweight dashboard.</p>
    `,
  },
];

export default projects;
