import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import { PostData, PageData, ThreadData } from "@/types"
import { globSync } from "glob"

const postsDirectory = join(process.cwd(), "content/posts")
const pagesDirectory = join(process.cwd(), "content/pages")
const threadsDirectory = join(process.cwd(), "content/threads")

// --- Posts ---

export function getPostSlugs() {
    const files = globSync("**/*.{md,mdx}", {
        cwd: postsDirectory,
        ignore: ["assets/**", ".obsidian/**", "**/_*.md", "**/_*.mdx"]
    })
    return files.map((file) => file.replace(/\.(md|mdx)$/, ""))
}

export function getPostBySlug(slug: string): PostData | null {
    const realSlug = slug.replace(/\.(md|mdx)$/, "")
    let fullPath = join(postsDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
        fullPath = join(postsDirectory, `${realSlug}.mdx`)
    }

    try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // In the new flat structure, we might want to ensure the date is present
        // or default it to file creation time if needed, but strict typings suggest it's required.

        let coverImage = data.coverImage
        if (!coverImage) {
            const extensions = ['jpg', 'png', 'webp', 'jpeg']
            for (const ext of extensions) {
                const assetPath = join(process.cwd(), 'public', 'assets', `${realSlug}.${ext}`)
                if (fs.existsSync(assetPath)) {
                    coverImage = `/assets/${realSlug}.${ext}`
                    break
                }
            }
        }

        return {
            slug: realSlug,
            title: data.title,
            date: data.date,
            content: content,
            coverImage: coverImage,
            author: data.author,
            excerpt: data.excerpt,
            tags: data.tags,
            readingTime: data.readingTime,
            thread: data.thread,
        } as PostData
    } catch (e) {
        return null
    }
}

export function getAllPosts(): PostData[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is PostData => post !== null)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}

// --- Pages ---

export function getPageSlugs() {
    // Pages are flat in content/pages
    return fs.readdirSync(pagesDirectory)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ""))
}

export function getPageBySlug(slug: string): PageData | null {
    const realSlug = slug.replace(/\.(md|mdx)$/, "")
    let fullPath = join(pagesDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
        fullPath = join(pagesDirectory, `${realSlug}.mdx`)
    }

    try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            title: data.title,
            description: data.description,
            content: content,
            coverImage: data.coverImage,
            featuredPosts: data.featuredPosts,
            featuredThreads: data.featuredThreads
        } as PageData
    } catch (e) {
        return null
    }
}

export function getAllPages(): PageData[] {
    const slugs = getPageSlugs()
    return slugs
        .map(slug => getPageBySlug(slug))
        .filter((page): page is PageData => page !== null)
}

// --- Threads ---

export function getThreadSlugs() {
    return fs.readdirSync(threadsDirectory)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ""))
}

export function getThreadBySlug(slug: string): ThreadData | null {
    const realSlug = slug.replace(/\.(md|mdx)$/, "")
    let fullPath = join(threadsDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
        fullPath = join(threadsDirectory, `${realSlug}.mdx`)
    }

    try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            title: data.title,
            description: data.description,
            content: content,
            coverImage: data.coverImage,
            posts: data.posts
        } as ThreadData
    } catch (e) {
        return null
    }
}

export function getAllThreads(): ThreadData[] {
    const slugs = getThreadSlugs()
    return slugs
        .map(slug => getThreadBySlug(slug))
        .filter((thread): thread is ThreadData => thread !== null)
}

// --- Helpers ---

export function getPostsForThread(threadSlug: string): PostData[] {
    const thread = getThreadBySlug(threadSlug)
    if (!thread || !thread.posts) return []

    return thread.posts
        .map(slug => getPostBySlug(slug))
        .filter((post): post is PostData => post !== null)
}

export function getPostsByTag(tag: string): PostData[] {
    const allPosts = getAllPosts()
    return allPosts.filter((post) => {
        return post.tags && post.tags.map(t => t.toLowerCase().replace(/ /g, '-')).includes(tag.toLowerCase())
    })
}

export function getAllTags() {
    const allPosts = getAllPosts()
    const normalizedMap = new Map<string, number>()
    allPosts.forEach(post => {
        post.tags?.forEach(tag => {
            // Store by normalized key
            const key = tag.toLowerCase().trim()
            normalizedMap.set(key, (normalizedMap.get(key) || 0) + 1)
        })
    })

    return Array.from(normalizedMap.entries()).sort((a, b) => b[1] - a[1])
}

// --- Art Blogs ---

export function getArtBlogContent(category: string, slug: string): string | null {
    const fileName = `${category}-${slug}.md`
    const filePath = join(process.cwd(), "public/blogs", fileName) // Reading from public/blogs

    if (!fs.existsSync(filePath)) {
        return null
    }

    try {
        return fs.readFileSync(filePath, "utf8")
    } catch (e) {
        console.error(`Error reading blog file: ${filePath}`, e)
        return null
    }
}
