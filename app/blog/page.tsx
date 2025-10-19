import { getAllPosts } from "@/utils/getPosts"
import type { PostData } from "@/types"
import BlogPageClient from "@/components/BlogPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AgileCoder Blog | Tutorials, Insights & Developer Resources",
  description:
    "Explore in-depth tutorials, insights, and engineering workflows from AgileCoder — your hub for modern web development and developer tools.",
  alternates: {
    canonical: "https://www.agilecoder.in/blog",
  },
  openGraph: {
    title: "AgileCoder Blog | Tutorials, Insights & Developer Resources",
    description:
      "Read the latest developer insights, tutorials, and updates from AgileCoder — where innovation meets code.",
    url: "https://www.agilecoder.in/blog",
    siteName: "AgileCoder",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.agilecoder.in/default-og.png",
        width: 1200,
        height: 630,
        alt: "AgileCoder Blog Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgileCoder Blog | Tutorials, Insights & Developer Resources",
    description:
      "Stay updated with the latest tech insights and tutorials from AgileCoder.",
    images: ["https://www.agilecoder.in/default-og.png"],
    creator: "@agilecoder_in",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function BlogPage() {
  const posts: PostData[] = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "coverImage",
  ])

  return <BlogPageClient posts={posts} />
}
