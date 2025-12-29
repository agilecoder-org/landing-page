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
}
