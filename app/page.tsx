import Hero from "@/components/sections/Hero"
import ToolsSection from "@/components/sections/ExploreSection"
import ServicesSection from "@/components/sections/ServicesSection"
import WhyAgileCoder from "@/components/sections/WhyAgileCoder"
import BlogPreview from "@/components/sections/BlogPreview"
import About from "@/components/sections/About"
import ContactForm from "@/components/sections/ContactForm"
import Footer from "@/components/Footer"
import { getAllPosts } from "@/utils/getPosts"

export default function Home() {
  const posts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"])

  return (
    <main className="min-h-screen">
      <Hero />
      <ToolsSection />
      <ServicesSection />
      <WhyAgileCoder />
      <BlogPreview posts={posts} />
      <About />
      <ContactForm />
      <Footer />
    </main>
  )
}
