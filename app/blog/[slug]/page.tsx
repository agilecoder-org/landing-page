import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/utils/getPosts"
import Link from "next/link"
import Footer from "@/components/Footer"
import { Metadata } from "next"
import PostContent from "@/components/PostContent" // Import the new client-side component

interface Params {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ["title", "excerpt"])

  return {
    title: `${post.title} | AgileCoder`,
    description: post.excerpt,
  }
}

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "excerpt",
  ])

  if (!post?.slug) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-[900px] w-full mx-auto px-10 py-8">
        <Link href="/#blog" className="text-black hover:underline mb-8 inline-block">
          ← Back to all posts
        </Link>

        {/* Render markdown content on the client */}
        <PostContent post={post as any} />
      </div>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"])

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
