import { getAllPosts } from "@/utils/getPosts"
import type { PostData } from "@/types"
import BlogPageClient from '@/components/BlogPage';

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
    <BlogPageClient posts={posts} />
  )
}
