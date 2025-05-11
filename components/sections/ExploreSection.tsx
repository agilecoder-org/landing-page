import { BookOpen, Code, Server, Terminal } from "lucide-react";

export default function ExploreSection() {
  const products = [
    {
      title: "Agile Blog",
      description:
        "Tutorials, guides, and dev workflows for building and deploying production apps with MERN, Rails + React, and modern cloud tools.",
      icon: <BookOpen className="h-10 w-10 text-black" />,
      action: {
        label: "Visit →",
        type: "link",
        href: "https://blog.agilecoder.in", 
      },
    },
    {
      title: "Agile CMS",
      description:
        "A powerful, multi-tenant blog CMS designed for modern content creators and SaaS platforms.",
      icon: <Server className="h-10 w-10 text-black" />,
      action: {
        label: "Coming Soon",
        type: "text",
      },
    },
    {
      title: "Starter Templates",
      description:
        "Production-ready starter templates for apps using React, Next.js, Express, and more.",
      icon: <Code className="h-10 w-10 text-black" />,
      action: {
        label: "Coming Soon",
        type: "text",
      },
    },
    {
      title: "Agile Profiler",
      description:
        "Create a professional portfolio in minutes with our customizable portfolio generator.",
      icon: <Terminal className="h-10 w-10 text-black" />,
      action: {
        label: "Coming Soon",
        type: "text",
      },
    },
    {
      title: "More Utilities",
      description:
        "We're building more plugins, developer tools, and project kickstarters — stay tuned.",
      icon: <Code className="h-10 w-10 text-black" />,
      action: {
        label: "Coming Soon",
        type: "text",
      },
    },
  ];

  return (
    <section id="explore" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{product.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.action.type === "link" ? (
                <a
                  href={product.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  {product.action.label}
                </a>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
                  {product.action.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
