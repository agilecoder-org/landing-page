import fs from "fs"
import { join, dirname, sep } from "path"
import matter from "gray-matter"
import type { PostData } from "@/types"
import { cache } from "react"
import { globSync } from "glob"

const postsDirectory = join(process.cwd(), "content")

export function getPostSlugs() {
  // Use glob to recursively find all .md files, ignoring excluded dirs
  const files = globSync("**/*.md", {
    cwd: postsDirectory,
    ignore: ["assets/**", ".obsidian/**", "**/_*.md"]
  })
  return files.map((file) => file.replace(/\.md$/, ""))
}

export function getPostBySlug(slug: string | string[], fields: string[] = []) {
  const realSlug = Array.isArray(slug) ? slug.join("/") : slug
  // Ensure we don't duplicate extensions if passed
  const cleanSlug = realSlug.replace(/\.md$/, "")
  const fullPath = join(postsDirectory, `${cleanSlug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const items: Partial<PostData> = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = cleanSlug
      } else if (field === "content") {
        items[field] = content
      } else if (data[field]) {
        // Safe cast as we are mapping dynamic data to known interface
        (items as any)[field] = data[field]
      }
    })

    return items as PostData
  } catch (e) {
    // console.error(`Error reading file ${fullPath}:`, e)
    return null
  }
}

export const getAllPosts = cache((fields: string[] = []) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter out potential nulls from missing files
    .filter((post): post is PostData => post !== null)
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
})

export const getPostsByCategory = cache((categoryPath: string, fields: string[] = []) => {
  const allPosts = getAllPosts(["slug", ...fields])
  // Filter posts that start with the category path
  // Ensure we match directory boundaries (e.g., "tech" matches "tech/post" but not "tech-news/post")
  return allPosts.filter((post) => {
    return post.slug === categoryPath || post.slug.startsWith(`${categoryPath}/`)
  })
})

export const getAllCategories = cache(() => {
  const files = globSync("**/*.md", {
    cwd: postsDirectory,
    ignore: ["assets/**", ".obsidian/**", "**/_*.md"]
  })
  const categories = new Set<string>()

  files.forEach((file) => {
    const dir = dirname(file)
    if (dir !== ".") {
      // Add all parent directories as categories too
      const parts = dir.split(sep)

      // We only want top-level folders as "Main Categories" usually, but let's support nested.
      // But user said "folders inside content/ as categories".
      // Let's take the first path segment as the primary category for display purposes if needed.

      let currentPath = ""
      parts.forEach(part => {
        currentPath = currentPath ? join(currentPath, part) : part
        // Filter out system dirs just in case (though glob ignore handles files)
        if (!['assets', '.obsidian'].includes(currentPath)) {
          categories.add(currentPath)
        }
      })
    }
  })

  return Array.from(categories).sort()
})

export const getPostsByTag = cache((tag: string, fields: string[] = []) => {
  const allPosts = getAllPosts(["slug", "tags", ...fields])
  return allPosts.filter((post) => {
    return post.tags && post.tags.map(t => t.toLowerCase().replace(/ /g, '-')).includes(tag.toLowerCase())
  })
})

export const getAllTags = cache(() => {
  const allPosts = getAllPosts(["tags"])
  const tags = new Map<string, number>()

  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        const normalizedTag = tag.toLowerCase().replace(/ /g, '-')
        tags.set(normalizedTag, (tags.get(normalizedTag) || 0) + 1)
      })
    }
  })

  // Return array of [tag, count] sorted by count descending
  return Array.from(tags.entries()).sort((a, b) => b[1] - a[1])
})
