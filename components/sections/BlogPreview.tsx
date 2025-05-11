import Link from "next/link"
import type { PostData } from "@/types"
import BlogCard from "../BlogCard"

interface BlogPreviewProps {
  posts: PostData[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const latestPosts = posts.slice(0, 3)

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length > 3 && (
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block bg-black hover:bg-neutral-800 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
