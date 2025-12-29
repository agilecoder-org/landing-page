"use client"
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import Link from "next/link";

export default function ImprovedFooter() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Books", href: "/books" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Agile-Coder-Org",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/iamsmruti/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:agilecoder@outlook.in",
      label: "Email",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  } as const;

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/agilecoder-dark.png"
                alt="AgileCoder Logo"
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-2xl font-bold">AgileCoder</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Innovate. Build. Deliver.
            </p>
            <p className="text-sm text-gray-500">
              Building the future, one line of code at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <h4 className="font-semibold mb-4 text-lg">Connect</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Follow us for updates and insights
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <h4 className="font-semibold mb-4 text-lg">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@agilecoder.in"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                support@agilecoder.in
              </a>
              <a
                href="mailto:agilecoder@outlook.in"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                agilecoder@outlook.in
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm text-center md:text-left"
            >
              &copy; {new Date().getFullYear()} AgileCoder. All rights reserved.
            </motion.p>

            {/* Made with love */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm flex items-center gap-2"
            >
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by AgileCoder
            </motion.p>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-6 text-sm"
            >
              <Link href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>
  );
}