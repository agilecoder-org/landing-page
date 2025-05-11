import { Smile, BrainCog, Rocket, WandSparkles } from "lucide-react";

export default function WhyAgileCoder() {
  const values = [
    {
      title: "Minimal & Clear",
      description:
        "We prioritize simplicity — clean designs and minimal code, ensuring easy maintenance and clarity.",
      icon: <Smile className="h-10 w-10 text-black" />,
    },
    {
      title: "AI-Enhanced Workflows",
      description:
        "We leverage AI to automate processes, speed up development, and eliminate repetitive tasks for efficiency.",
      icon: <BrainCog className="h-10 w-10 text-black" />,
    },
    {
      title: "Fast Delivery",
      description:
        "With our streamlined workflows and tools, we ensure faster delivery without compromising quality.",
      icon: <Rocket className="h-10 w-10 text-black" />,
    },
    {
      title: "Developer First",
      description:
        "Focused on providing developers with intuitive tools and a smooth, enjoyable experience during development.",
      icon: <WandSparkles className="h-10 w-10 text-black" />,
    },
  ];

  return (
    <section id="why" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why AgileCoder?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
