export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string; // ISO date
  content: string; // HTML or Markdown rendered content
}

// No posts yet — the blog is "coming soon".
// Add entries here to populate the list and generate per-post pages.
const blogPosts: BlogPost[] = [];

export default blogPosts;
