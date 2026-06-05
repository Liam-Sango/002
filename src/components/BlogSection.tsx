"use client";

import { useState, useMemo } from "react";
import blogPosts, { getAllTags, filterPosts } from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogSection() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const allTags = useMemo(() => getAllTags(), []);

  const visiblePosts = useMemo(
    () => filterPosts(activeTag, search || undefined),
    [activeTag, search],
  );

  return (
    <section id="blog" className="section" aria-labelledby="blog-heading">
      <div className="site-container">
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">📝 Blog</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <h2 id="blog-heading" className="section-title">
              Blog
            </h2>

            {/* Search + tag filter toolbar */}
            <div className="blog-toolbar">
              <label htmlFor="blog-search" className="sr-only">
                Search posts
              </label>
              <input
                id="blog-search"
                type="text"
                className="blog-search"
                placeholder="🔍 Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {allTags.length > 0 && (
              <div className="blog-tags" role="group" aria-label="Filter by tag">
                <button
                  className={`win-tag${!activeTag ? " win-tag--active" : ""}`}
                  onClick={() => setActiveTag(undefined)}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`win-tag${activeTag === tag ? " win-tag--active" : ""}`}
                    onClick={() =>
                      setActiveTag(activeTag === tag ? undefined : tag)
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Post list */}
            {visiblePosts.length === 0 ? (
              <p className="blog-empty">
                {blogPosts.length === 0
                  ? "No posts yet. Check back soon!"
                  : "No posts match your search."}
              </p>
            ) : (
              visiblePosts.map((post) => (
                <article key={post.id} className="win-card">
                  <h3>{post.title}</h3>
                  <p className="win-card-meta">{formatDate(post.date)}</p>
                  <p>{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="win-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="status-bar">
            <p className="status-bar-field">
              {visiblePosts.length} post{visiblePosts.length !== 1 ? "s" : ""}
            </p>
            <p className="status-bar-field">Blog</p>
          </div>
        </div>
      </div>
    </section>
  );
}
