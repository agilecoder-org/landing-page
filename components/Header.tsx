'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Home", url: "/" },
    { name: "Tech Blog", url: "/tech-blog" },
    { name: "Books", url: "/books" }
  ];

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
        <Link href="/" className='flex items-center gap-4 group'>
          <img className='rounded-full w-10' src="/agilecoder-dark.png" alt='Agile Coder Logo' />
          <h1 className="text-foreground sm:text-xl text-lg font-semibold">AgileCoder</h1>
        </Link>
        <nav className="space-x-6">
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
      </div>
    </header>
  );
}
