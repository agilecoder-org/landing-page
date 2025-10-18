"use client"
import { useState } from "react";
import { motion } from 'framer-motion';
import { 
  BookOpen, Code, Server, Terminal, Book, Video,
  Layout, ShieldCheck, Layers, Wrench, ArrowRight,
} from 'lucide-react';


export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState('products');

  const products = [
    {
      title: "Agile Blog",
      description: "In-depth tutorials and engineering workflows for modern web development.",
      icon: <BookOpen className="h-8 w-8" />,
      href: "https://blog.agilecoder.in",
      available: true
    },
    {
      title: "Agile Coder YT",
      description: "Video tutorials and coding walkthroughs on our YouTube channel.",
      icon: <Video className="h-8 w-8" />,
      href: "https://www.youtube.com/@AgileCoderYT",
      available: true
    },
    {
      title: "Published Books",
      description: "Practical knowledge across tech and development topics.",
      icon: <Book className="h-8 w-8" />,
      href: "https://books.agilecoder.in",
      available: true
    },
    {
      title: "Artful Coding",
      description: "Where code becomes art through generative design and visualizations.",
      icon: <Code className="h-8 w-8" />,
      href: "https://artfulcoding.in",
      available: true
    },
    {
      title: "Starter Templates",
      description: "Ready-to-use boilerplates for TypeScript, React, Next.js, and Express.",
      icon: <Terminal className="h-8 w-8" />,
      href: "https://agilecoder.gumroad.com/l/node-ts-starter",
      available: true
    },
    {
      title: "Agile CMS",
      description: "Multi-tenant blog CMS for modern content creators.",
      icon: <Server className="h-8 w-8" />,
      available: false
    }
  ];

  const services = [
    {
      title: "Frontend Development",
      description: "Landing pages, product sites, and responsive web applications.",
      icon: <Layout className="h-8 w-8" />
    },
    {
      title: "Backend Development",
      description: "Scalable APIs and production-ready server architecture.",
      icon: <ShieldCheck className="h-8 w-8" />
    },
    {
      title: "Full Stack Solutions",
      description: "Complete web applications from database to UI.",
      icon: <Layers className="h-8 w-8" />
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing updates and optimization for stability.",
      icon: <Wrench className="h-8 w-8" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="offerings" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          What We Offer
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${activeTab === 'products'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Products & Resources
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${activeTab === 'services'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Client Services
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'products' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-black">{product.icon}</div>
                    {!product.available && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  {product.available ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-black font-medium hover:gap-2 transition-all"
                    >
                      Visit <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  ) : (
                    <span className="text-gray-400">In Development</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-6 mb-12"
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-lg transition"
                  >
                    <div className="text-black mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-black text-white rounded-2xl p-12 text-center"
              >
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help bring your ideas to life with clean, efficient, and scalable solutions.
                </p>
                <button className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-lg transition">
                  Get in Touch
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
