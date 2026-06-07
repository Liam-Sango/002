import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import blogPosts from "@/data/blog";
import { formatDate } from "@/lib/site";

// Static export: pre-render exactly one page per known post, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Liam Sango`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) notFound();

  return (
    <main>
      <div className="site-container">
        <article className="glass-card article panel-enter">
          <Link href="/#blog" className="back-link">
            ← Back to writing
          </Link>

          <header className="article-header">
            <span className="section-eyebrow">Writing</span>
            <h1 className="article-title">{post.title}</h1>
            <div className="article-meta">
              <span>{formatDate(post.date)}</span>
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="article-foot">
            <Link href="/#blog" className="back-link">
              ← Back to writing
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
