import { getAllPosts } from "@/utils/getPosts"
import type { PostData } from "@/types"
import BlogCard from "@/components/BlogCard"

export default async function BlogPage() {
  const posts: PostData[] = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "coverImage",
  ])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-16">
          All Blog Posts
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
