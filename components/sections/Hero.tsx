"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Innovate. Build. Deliver.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            We create developer tools, resources, and build custom solutions for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#explore" className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-lg transition">
              Explore Products
            </Link>
            <Link
              href="#contact" className="border border-white hover:bg-white hover:text-black font-semibold py-3 px-8 rounded-lg transition">
              Hire Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
