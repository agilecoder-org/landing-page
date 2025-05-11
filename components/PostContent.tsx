"use client" // Mark this as a client-side component

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm" // For GitHub Flavored Markdown support

interface PostContentProps {
  post: {
    title: string
    date: string
    slug: string
    author: string
    content: string
    coverImage: string
    excerpt: string
  }
}

export default function PostContent({ post }: PostContentProps) {
  const [content, setContent] = useState<string>("")
  const [isContentLoaded, setIsContentLoaded] = useState(false)

  useEffect(() => {
    // Set content when the component mounts (client-side rendering of markdown)
    if (post?.content) {
      setContent(post.content)
    }

    // Check if there's a fragment identifier in the URL (e.g., #title) after content is loaded
    if (isContentLoaded && window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.substring(1))
      if (targetElement) {
        // Scroll smoothly to the element with the id from the URL fragment
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [post?.content, isContentLoaded]) // Dependency includes isContentLoaded

  // Set isContentLoaded to true after markdown is rendered
  useEffect(() => {
    if (content) {
      setIsContentLoaded(true)
    }
  }, [content])

  return (
    <article className="prose lg:prose-xl blog max-w-none">
      <h1
        className="text-4xl font-bold mb-4"
      >
        {post.title}
      </h1>
      <div className="text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {post.author && ` • ${post.author}`}
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage || "/placeholder.svg"}
          alt={`Cover Image for ${post.title}`}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}

      {/* Render the markdown content using ReactMarkdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown support
        children={content}
        // Optional: You can also customize the rendering for each markdown element here
      />

      {/* Ensure that the scroll happens only after content is fully loaded */}
      {isContentLoaded && (
        <div id="scroll-anchor" className="hidden"></div>
      )}
    </article>
  )
}
