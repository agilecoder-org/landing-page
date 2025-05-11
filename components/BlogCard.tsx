import Link from "next/link"
import Image from "next/image"
import type { PostData } from "@/types"

interface BlogCardProps {
  post: PostData
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white border border-black rounded-lg overflow-hidden hover:shadow-md transition duration-300">
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={`Cover for ${post.title}`}
          width={800}
          height={400}
          className="w-full h-48 object-cover border-b border-black"
        />
      )}
      <div className="p-6">
        {/* Title is now wrapped in Link */}
        <Link href={`/blog/${post.slug}#top`}>
          <h2 className="text-2xl font-semibold text-black mb-1 hover:underline">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {post.author}
        </p>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-black font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}
