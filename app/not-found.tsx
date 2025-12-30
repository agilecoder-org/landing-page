import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-5 bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">
        Oops! The page you're looking for doesn’t exist.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Go Home
        </Link>

        <Link
          href="/tech-blog"
          className="px-5 py-2.5 border border-border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          Visit Tech Blog
        </Link>
      </div>
    </div>
  )
}

export default NotFound
