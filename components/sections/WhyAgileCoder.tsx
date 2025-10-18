"use client"
import { motion } from "framer-motion";
import { Smile, BrainCog, Rocket, WandSparkles } from "lucide-react";

export default function WhyAgileCoder() {
  const values = [
    {
      title: "Minimal & Clear",
      description: "Clean designs and maintainable code.",
      icon: <Smile className="h-8 w-8" />
    },
    {
      title: "AI-Enhanced",
      description: "Leveraging AI for efficiency.",
      icon: <BrainCog className="h-8 w-8" />
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround without compromise.",
      icon: <Rocket className="h-8 w-8" />
    },
    {
      title: "Developer First",
      description: "Intuitive tools and smooth experience.",
      icon: <WandSparkles className="h-8 w-8" />
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Why AgileCoder?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="inline-block text-black mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
