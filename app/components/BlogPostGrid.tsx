import Reveal from "./Reveal";
import BlogPostCard from "./BlogPostCard";
import type { BlogPostSummary } from "../lib/blog";

interface BlogPostGridProps {
  posts: BlogPostSummary[];
  emptyMessage: string;
}

const BlogPostGrid = ({ posts, emptyMessage }: BlogPostGridProps) => {
  if (posts.length === 0) {
    return (
      <Reveal>
        <p className="annotation">{emptyMessage}</p>
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <Reveal key={post.id} delay={0.05 * (index % 3)}>
          <BlogPostCard post={post} />
        </Reveal>
      ))}
    </div>
  );
};

export default BlogPostGrid;
