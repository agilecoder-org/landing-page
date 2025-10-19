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
  const post = getPostBySlug(params.slug, [
    "title",
    "excerpt",
    "coverImage",
    "slug",
  ])

  if (!post) {
    return {
      title: "Post Not Found | AgileCoder",
      description: "The post you’re looking for does not exist.",
    }
  }

  const baseUrl = "https://www.agilecoder.in"
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const imageUrl = post.coverImage
    ? `${baseUrl}${post.coverImage}`
    : `${baseUrl}/default-og.jpg`

  return {
    title: `${post.title} | AgileCoder`,
    description: post.excerpt || "Read the latest insights on AgileCoder.",
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} | AgileCoder`,
      description: post.excerpt,
      url: postUrl,
      siteName: "AgileCoder",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | AgileCoder`,
      description: post.excerpt,
      images: [imageUrl],
      creator: "@agilecoder_in",
    },
    robots: {
      index: true,
      follow: true,
    },
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
