"use client"
import { motion } from 'framer-motion';
import { Lightbulb, Hammer, Users, GraduationCap } from 'lucide-react';

export default function ImprovedAbout() {
  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries",
      icon: <Lightbulb className="h-8 w-8" />
    },
    {
      title: "Craftsmanship",
      description: "Attention to detail",
      icon: <Hammer className="h-8 w-8" />
    },
    {
      title: "Community",
      description: "Giving back",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Education",
      description: "Sharing knowledge",
      icon: <GraduationCap className="h-8 w-8" />
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
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  } as const;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About The Lab
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              A digital playground for building, experimenting, and sharing the software engineering journey.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-xl p-6 text-center group hover:bg-black hover:text-white transition-colors duration-300"
              >
                <motion.div
                  className="inline-block text-black group-hover:text-white mb-4 transition-colors duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in creating tools and solutions that empower developers and businesses to build better, faster, and smarter. Every line of code we write is driven by a commitment to quality, simplicity, and innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}