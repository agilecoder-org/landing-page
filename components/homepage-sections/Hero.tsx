"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Code. Create. Experiment.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            The central headquarters for projects, libraries, and digital experiments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#projects" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 rounded-lg transition">
              View Projects
            </Link>
            <Link
              href="/blog" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-3 px-8 rounded-lg transition">
              Read Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
