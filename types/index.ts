export interface PostData {
  slug: string
  title: string
  date: string
  coverImage?: string
  author?: string
  excerpt?: string
  content: string
  tags?: string[]
  readingTime?: number
  thread?: string // Slug of the thread this post belongs to
}

export interface PageData {
  title: string
  description: string
  slug: string
  coverImage?: string
  featuredPosts?: string[] // Slugs of posts to feature
  featuredThreads?: string[] // Slugs of threads to feature
  content: string // The body content of the page
}

export interface ThreadData {
  title: string
  description: string
  slug: string
  coverImage?: string
  posts: string[] // List of post slugs in order
  content: string // Introduction or context for the thread
}
