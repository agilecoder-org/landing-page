import { books } from "@/data/books"
import Link from "next/link"
import { Metadata } from "next"
import ImprovedFooter from "@/components/Footer"

export const metadata: Metadata = {
    title: "Books | AgileCoder",
    description: "Books and resources for modern developers.",
    openGraph: {
        title: "Books | AgileCoder",
        description: "Books and resources for modern developers.",
        url: "https://www.agilecoder.in/books",
        siteName: "AgileCoder",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Books | AgileCoder",
        description: "Books and resources for modern developers.",
        creator: "@agilecoder_in",
    },
}

export default function BooksPage() {
    const featuredBook = books.find((book) => book.featured)
    const otherBooks = books.filter((book) => !book.featured)

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-12 lg:py-20">
                    {/* Featured Book Section */}
                    {featuredBook && (
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-24 max-w-6xl mx-auto">
                            {/* Book Cover (3D Effect Placeholder) */}
                            <div className="relative w-[280px] md:w-[320px] lg:w-[400px] aspect-[2/3] group perspective-1000 flex-shrink-0">
                                <div
                                    className="w-full h-full relative rounded-lg shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-6 group-hover:scale-105"
                                    style={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={featuredBook.coverImage}
                                        alt={featuredBook.title}
                                        className="rounded-r-md rounded-l-sm w-full h-full object-cover bg-neutral-200"
                                    />
                                    {/* Spine effect (simplified) */}
                                    <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent rounded-l-sm pointer-events-none" />
                                </div>

                                {/* Shadow reflection */}
                                <div className="absolute -bottom-8 left-4 right-4 h-4 bg-black/20 blur-xl rounded-full" />
                            </div>

                            {/* Book Details */}
                            <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                                    {featuredBook.title}
                                </h1>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    {featuredBook.description}
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                                    {featuredBook.links.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            className={`inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                        ${link.primary
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                {featuredBook.promotion?.active && (
                                    <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border w-full">
                                        <span className="mr-2">🎉</span>
                                        {featuredBook.promotion.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Other Books Grid (if any) */}
                    {otherBooks.length > 0 && (
                        <div className="mb-24">
                            <h2 className="text-3xl font-bold text-center mb-12">More Books</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherBooks.map((book) => (
                                    <div key={book.id} className="group relative flex flex-col items-center">
                                        {/* Simplified card for other books */}
                                        <div className="w-[180px] aspect-[2/3] mb-6 shadow-lg rounded transition-transform group-hover:-translate-y-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover rounded bg-neutral-100"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-center">{book.title}</h3>
                                        <div className="flex gap-2 mt-auto">
                                            {book.links.map(link => (
                                                <Link
                                                    key={link.label}
                                                    href={link.url}
                                                    className="text-sm font-medium text-primary hover:underline"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Newsletter Section - Separated Background */}
                <section className="bg-muted/30 py-20 border-t border-b border-border">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4 tracking-tight">Get Discount Codes</h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                Subscribe to our newsletter and receive exclusive discount codes for all our books on Gumroad.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 shadow-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 shadow-sm"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <ImprovedFooter />
        </div>
    )
}
