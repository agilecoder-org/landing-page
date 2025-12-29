import { getAllPosts, getAllCategories } from "@/utils/getPosts"
import CategoryList from "@/components/CategoryList"
import { BlogSidebar } from "@/components/BlogSidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AgileCoder Blog | Engineering & Tech Insights",
  description: "Explore in-depth tutorials, system design patterns, and engineering workflows.",
}

export default async function BlogPage() {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "coverImage",
    "tags",
    "readingTime",
  ])

  const categories = getAllCategories()

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main Content: 2/3 roughly by grid ratio on large screens, or flex-grow */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
            <CategoryList posts={posts} />
          </div>

          {/* Sidebar: 1/3 roughly */}
          <div className="lg:sticky lg:top-10 h-fit">
            <BlogSidebar categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
