import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/utils/getPosts"
import Footer from "@/components/Footer"
import { Metadata } from "next"
import PostContent from "@/components/PostContent"

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
    <>
      <PostContent post={post as any} />
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"])

  return posts.map((post) => ({
    slug: post.slug,
  }))
}