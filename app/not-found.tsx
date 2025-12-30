import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-5">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you're looking for doesn’t exist.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 text-white bg-black rounded-lg hover:bg-opacity-80 transition-colors duration-200"
        >
          Go Home
        </Link>

        <Link
          href="/tech-blog"
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Visit Tech Blog
        </Link>
      </div>
    </div>
  )
}

export default NotFound
