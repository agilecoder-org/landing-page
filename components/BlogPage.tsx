"use client"

import { PostData } from '@/types';
import { motion } from 'framer-motion';
import { Search, Calendar, TrendingUp, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
import BackButton from './BackToHome';

interface BlogPageClientProps {
  posts: PostData[];
}

export default async function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  } as const;

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            All Blog Posts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Insights, tutorials, and best practices from our development journey
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />
            </div>

            {/* Sort Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition ${sortBy === 'latest'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Clock className="h-4 w-4" />
                Latest
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition ${sortBy === 'popular'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <TrendingUp className="h-4 w-4" />
                Popular
              </button>
            </div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-gray-600"
          >
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <a href={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-black transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-black font-medium">
                      Read more
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
