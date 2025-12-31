'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Code & Art", url: "/code-and-art" },
    { name: "Tech Blog", url: "/tech-blog" },
    { name: "Books", url: "/books" }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  } as const;

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className='flex items-center gap-3 md:gap-4 group' onClick={() => setIsOpen(false)}>
          <img className='rounded-full w-8 md:w-10' src="/agilecoder-dark.png" alt='Agile Coder Logo' />
          <h1 className="text-foreground text-lg md:text-xl font-semibold">AgileCoder</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {links.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={`transition-colors font-medium ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 pb-6 space-y-4">
              {links.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium py-2 border-b border-border/50 transition-colors ${isActive ? 'text-primary' : 'text-foreground/80'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
