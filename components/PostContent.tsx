"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Copy } from "lucide-react"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PostContentClientProps {
  post: {
    title: string
    date: string
    slug: string
    author: string
    content: string
    coverImage?: string
    excerpt: string
  }
}

export default function PostContentClient({ post }: PostContentClientProps) {
  const [content, setContent] = useState<string>("")
  const [isContentLoaded, setIsContentLoaded] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (post?.content) {
      setContent(post.content)
      const words = post.content.split(/\s+/).length
      setReadingTime(Math.ceil(words / 200))
    }
  }, [post?.content])

  useEffect(() => {
    if (content) {
      setIsContentLoaded(true)
    }
  }, [content])

  useEffect(() => {
    if (isContentLoaded && window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.substring(1))
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [isContentLoaded])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleShare = (platform: string) => {
    const text = encodeURIComponent(post.title)
    const url = encodeURIComponent(shareUrl)
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <div className="container max-w-[900px] w-full mx-auto px-6 md:px-10 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </a>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {readingTime} min read
            </span>
            
            {/* Share Button */}
            <div className="relative ml-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <Share2 className="h-4 w-4" />
                Share
              </motion.button>

              {/* Share Menu */}
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 min-w-[160px] z-10"
                >
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition text-left"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition text-left"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition text-left"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 rounded-2xl overflow-hidden"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-black
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-black prose-a:font-medium prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2
              prose-strong:text-black prose-strong:font-semibold
              prose-code:text-black prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic
              prose-ul:list-disc prose-ul:ml-6
              prose-ol:list-decimal prose-ol:ml-6
              prose-li:mb-2
              prose-img:rounded-xl prose-img:shadow-lg"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </motion.div>
        </motion.article>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for more insights and tutorials on modern web development.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  )
}