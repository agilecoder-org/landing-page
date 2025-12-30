"use client"
import { useState } from "react";
import { motion } from 'framer-motion';
import {
  BookOpen, Code, Server, Terminal, Book, Video,
  Layout, ShieldCheck, Layers, Wrench, ArrowRight,
} from 'lucide-react';


export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      title: "Agile Coder YT",
      description: "Video tutorials and coding walkthroughs on our YouTube channel.",
      icon: <Video className="h-8 w-8" />,
      href: "https://www.youtube.com/@AgileCoderYT",
      active: true
    },
    {
      title: "Artful Coding",
      description: "Where code becomes art through generative design and visualizations.",
      icon: <Code className="h-8 w-8" />,
      href: "https://artfulcoding.vercel.app",
      active: true
    },
    {
      title: "Books",
      description: "Practical guides and books for modern developers.",
      icon: <Book className="h-8 w-8" />,
      href: "/books",
      active: true
    }
  ];

  const packages = [
    {
      title: "node-ts-starter",
      description: "Production-ready boilerplate for TypeScript, React, and Node.js.",
      icon: <Terminal className="h-8 w-8" />,
      href: "https://agilecoder.gumroad.com/l/node-ts-starter",
      active: true
    },
    {
      title: "Coming Soon",
      description: "More open source packages and libraries are in the works.",
      icon: <Server className="h-8 w-8" />,
      href: "#",
      active: false
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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Projects & Ecosystem
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${activeTab === 'projects'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${activeTab === 'packages'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Packages & Tools
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
          {activeTab === 'projects' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-foreground">{item.icon}</div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 h-12 line-clamp-2">{item.description}</p>

                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? "_blank" : "_self"}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center text-sm font-semibold text-foreground hover:gap-2 transition-all mt-2"
                  >
                    View Project <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {packages.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-foreground">{item.icon}</div>
                    {item.active ? (
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    ) : (
                      <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Soon</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 h-12 line-clamp-2">{item.description}</p>

                  {item.active ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-foreground hover:gap-2 transition-all mt-2"
                    >
                      View Package <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground mt-2 block">In Development</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
