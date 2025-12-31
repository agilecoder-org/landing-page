import Hero from "@/components/homepage-sections/Hero"
import ToolsSection from "@/components/homepage-sections/ExploreSection"
import WhyAgileCoder from "@/components/homepage-sections/WhyAgileCoder"
import BlogPreview from "@/components/homepage-sections/BlogPreview"
import About from "@/components/homepage-sections/About"
import ContactForm from "@/components/homepage-sections/ContactForm"
import Footer from "@/components/Footer"
import { getAllPosts } from "@/utils/content"

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen">
      <Hero />
      <ToolsSection />
      <WhyAgileCoder />
      <BlogPreview posts={posts} />
      <About />
      <ContactForm />
      <Footer />
    </main>
  )
}
