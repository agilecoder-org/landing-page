import { getAllPosts, getAllPages } from "@/utils/content"
import CategoryList from "@/components/CategoryList"
import { BlogSidebar } from "@/components/BlogSidebar"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AgileCoder Tech Blog | Engineering & Tech Insights",
  description: "Explore in-depth tutorials, system design patterns, and engineering workflows.",
}

export default async function BlogPage() {
  const posts = getAllPosts()
  const pages = getAllPages()

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <div className="space-y-12">

            {/* Pages / Topics Section */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Explore Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map(page => (
                  <Link key={page.slug} href={`/tech-blog/${page.slug}`} className="block group border rounded-xl p-6 hover:shadow-lg transition-all bg-card">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{page.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{page.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Recent Posts</h2>
              <CategoryList posts={posts.slice(0, 10)} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-36 h-fit">
            <BlogSidebar categories={pages.map(p => ({ title: p.title, slug: p.slug }))} />
          </div>
        </div>
      </div>
    </div>
  )
}
