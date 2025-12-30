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
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
        <Link href="/" className='flex items-center gap-4 group'>
          <img className='rounded-full w-10' src="/agilecoder-dark.png" alt='Agile Coder Logo' />
          <h1 className="group-hover:text-gray-300 sm:text-xl text-lg font-semibold">AgileCoder</h1>
        </Link>
        <nav className="space-x-6">
          {links.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={`transition ${isActive ? 'text-white brightness-125' : 'text-white brightness-75 hover:brightness-100'
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
