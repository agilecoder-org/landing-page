export interface Book {
    id: string
    title: string
    description: string
    coverImage: string
    featured: boolean
    links: {
        label: string
        url: string
        primary?: boolean
    }[]
    promotion?: {
        active: boolean
        platform: string
        message: string
    }
}

export const books: Book[] = [
    {
        id: "ai-toolkit",
        title: "The AI Toolkit for Modern Developers",
        description: "A practical field guide for thriving in the age of AI. Learn how to actually build with tools like GPT-4, Claude, and open-source models — not just talk about them. Gather the Mindset required to leverage AI.",
        coverImage: "/assets/books/ai-toolkit.png", // Placeholder, user needs to ensure this image exists
        featured: true,
        links: [
            {
                label: "Buy on Amazon",
                url: "https://amazon.com", // update with real link
                primary: true
            },
            {
                label: "Buy on Gumroad",
                url: "https://agilecoder.gumroad.com", // update with real link
                primary: true
            }
        ],
        promotion: {
            active: true,
            platform: "Gumroad",
            message: "This book is currently promoted on Gumroad. Subscribe to the newsletter to receive a discount coupon in your email!"
        }
    }
]
