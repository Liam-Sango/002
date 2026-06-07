export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string; // ISO date
  content: string; // HTML or Markdown rendered content
}

// ─────────────────────────────────────────────────────────────
// Sample data — replace these with your real posts.
// Posts are filterable by tag and searchable by title/excerpt.
// ─────────────────────────────────────────────────────────────
const blogPosts: BlogPost[] = [
  {
    id: "shipping-less-code",
    title: "Shipping Less Code",
    excerpt:
      "The features I'm proudest of are the ones I deleted. A look at how subtraction — not addition — became my default tool for keeping systems maintainable.",
    tags: ["engineering", "philosophy"],
    date: "2026-05-22",
    content: `
      <p>The features I'm proudest of are the ones I deleted. That sounds
      glib, but it's the closest thing I have to a guiding principle after a
      decade of shipping software: every line of code is a liability before
      it's an asset, and most systems rot from addition, not neglect.</p>

      <h2>The cost nobody budgets for</h2>
      <p>When we estimate a feature, we estimate the build. We almost never
      estimate the <em>carry</em> — the tests it needs forever, the edge cases
      it spawns, the onboarding paragraph it adds to the docs, the migration it
      complicates two years from now. Carry compounds. A codebase isn't the sum
      of its features; it's the product of their interactions.</p>

      <blockquote>The best time to delete a feature is the moment you realise
      no one would notice if it were gone.</blockquote>

      <h2>How I decide what to cut</h2>
      <p>I keep it boring and mechanical. Before I add anything, I ask:</p>
      <ul>
        <li><strong>Who breaks if this disappears?</strong> If I can't name them,
        it's a candidate for removal, not addition.</li>
        <li><strong>What does it cost to keep?</strong> Code that's load-bearing
        for one user-in-a-thousand still taxes the other 999.</li>
        <li><strong>Can configuration replace it?</strong> Two features that are
        80% the same are usually one feature wearing a costume.</li>
      </ul>

      <h2>Subtraction in practice</h2>
      <p>On the last product I worked on, we cut a third of the settings screen in
      a single afternoon. Support tickets dropped, the QA matrix shrank, and — the
      part I didn't expect — the team started moving faster, because there was
      simply less to reason about.</p>

      <pre><code>// the most satisfying diff I shipped that quarter
-  1,840 lines
+      0 lines</code></pre>

      <p>Adding is easy and feels productive. Subtracting takes judgement and a
      little courage. I've learned to treat the courage as part of the job.</p>
    `,
  },
  {
    id: "websockets-at-scale",
    title: "Keeping 10,000 WebSockets Honest",
    excerpt:
      "Notes from building the real-time layer behind Lumen Analytics — backpressure, heartbeats, and the day a single slow consumer nearly took the whole fleet down.",
    tags: ["engineering", "realtime", "performance"],
    date: "2026-03-08",
    content: `
      <p>Real-time systems fail in interesting ways. A REST endpoint either
      answers or it doesn't. A WebSocket fleet degrades — slowly, then all at
      once — and by the time a dashboard looks wrong, the cause is three layers
      deep. These are my notes from keeping ten thousand of them honest behind
      Lumen Analytics.</p>

      <h2>The slow consumer problem</h2>
      <p>Our first outage wasn't a thundering herd. It was a single laptop on
      hotel wifi. That one slow consumer couldn't drain its socket fast enough,
      so messages queued server-side, memory climbed, and the garbage collector
      started stealing time from <em>every other</em> connection. One bad client,
      ten thousand victims.</p>

      <blockquote>In a fan-out system, your tail latency is set by your worst
      reader, not your average one.</blockquote>

      <h2>Backpressure, not buffers</h2>
      <p>The fix wasn't a bigger buffer — it was admitting we couldn't serve
      everyone at the same rate. We gave each connection a bounded queue and a
      simple rule: if it overflows, we drop intermediate frames and send a
      coalesced snapshot instead.</p>

      <pre><code>if (conn.queue.length > MAX_QUEUE) {
  conn.queue = [snapshot(state)]; // collapse to latest
  metrics.increment("ws.coalesced");
}</code></pre>

      <p>For an analytics dashboard, the newest number is the only number that
      matters. Dropping stale frames isn't data loss — it's mercy.</p>

      <h2>Heartbeats earn their keep</h2>
      <p>TCP will happily believe a dead connection is alive for minutes.
      Application-level pings let us reclaim sockets in seconds:</p>
      <ul>
        <li>Ping every 15s; cut the connection after two misses.</li>
        <li>Treat a missed pong as a <em>signal</em>, not just a timeout — slow
        pongs predicted slow reads, so we used them to shed load early.</li>
        <li>Jitter the interval so ten thousand clients don't ping in lockstep.</li>
      </ul>

      <p>None of this is exotic. It's just the discipline of assuming every
      connection is one bad network away from becoming your problem.</p>
    `,
  },
  {
    id: "why-i-still-write-css",
    title: "Why I Still Write CSS by Hand",
    excerpt:
      "Utility frameworks are great, but every so often I reach for a plain stylesheet and a handful of custom properties. Here's when, and why it still feels good.",
    tags: ["css", "frontend", "design"],
    date: "2025-12-14",
    content: `
      <p>There's a particular calm to a well-organized stylesheet. Utility
      frameworks are genuinely great — I reach for them on most projects — but
      every so often I open a blank <code>.css</code> file, declare a handful of
      custom properties, and remember that the platform underneath has gotten
      <em>really</em> good.</p>

      <h2>Custom properties changed the calculus</h2>
      <p>The old argument against hand-written CSS was maintainability: change a
      colour, hunt it down in forty places. Custom properties retired that
      argument. One token, themed everywhere, switchable at runtime:</p>

      <pre><code>:root {
  --accent: #93c0ff;
  --radius: 24px;
}
.button { background: var(--accent); border-radius: var(--radius); }</code></pre>

      <h2>When I reach for plain CSS</h2>
      <ul>
        <li><strong>Distinctive design.</strong> When the goal is to <em>not</em>
        look like every other site, utility defaults fight you. A stylesheet
        with a real point of view wins.</li>
        <li><strong>Motion &amp; state.</strong> Keyframes, <code>:has()</code>,
        view transitions — these read far more clearly in a stylesheet than as a
        soup of inline classes.</li>
        <li><strong>Small surfaces.</strong> A landing page or a widget doesn't
        need a build step to stay tidy.</li>
      </ul>

      <blockquote>Frameworks optimise for teams moving fast across many screens.
      Hand-written CSS optimises for one screen being exactly right.</blockquote>

      <p>It's not framework <em>versus</em> stylesheet. It's knowing which problem
      you have. And every now and then, the problem is just wanting to enjoy the
      craft — which is reason enough.</p>
    `,
  },
];

/** All unique tags, sorted alphabetically */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      set.add(tag);
    }
  }
  return [...set].sort();
}

/** Filter posts by tag and/or search query (searches title + excerpt). */
export function filterPosts(
  tag?: string,
  query?: string,
): BlogPost[] {
  let result = [...blogPosts];

  if (tag) {
    result = result.filter((p) => p.tags.includes(tag));
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q),
    );
  }

  // newest first
  result.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return result;
}

export default blogPosts;
