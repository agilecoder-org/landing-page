import Footer from "@/components/Footer"

import { getAllPosts } from "@/utils/content"
import { SearchDialog } from "@/components/SearchDialog"
import { SearchButton } from "@/components/SearchButton"

interface BlogLayoutProps {
    children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    const posts = getAllPosts()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SearchDialog posts={posts} />
            <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
                <SearchButton />
            </div>
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
