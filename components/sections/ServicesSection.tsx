import Link from "next/link";
import { Layout, ShieldCheck, Layers, Terminal, Wrench } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Frontend Solutions",
      description:
        "Landing pages, product pages, launch sites, and responsive static sites crafted for performance and design.",
      icon: <Layout className="h-10 w-10 text-black" />,
    },
    {
      title: "Backend Development",
      description:
        "Scalable, secure APIs and production-ready server architecture built with modern backend technologies.",
      icon: <ShieldCheck className="h-10 w-10 text-black" />,
    },
    {
      title: "Full Stack Apps",
      description:
        "Complete web app development — from database to UI — tailored to your unique product requirements.",
      icon: <Layers className="h-10 w-10 text-black" />,
    },
    {
      title: "Scripting & Automation",
      description:
        "Custom scripts and automation tools to speed up workflows, manage data, and streamline operations.",
      icon: <Terminal className="h-10 w-10 text-black" />,
    },
    {
      title: "Maintenance & Support",
      description:
        "Ongoing support, updates, and optimization for your websites and apps to ensure stability and growth.",
      icon: <Wrench className="h-10 w-10 text-black" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-black transition duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href="#contact"
                className="inline-block bg-black hover:bg-neutral-800 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
