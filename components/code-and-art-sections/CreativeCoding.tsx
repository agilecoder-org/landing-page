"use client"
import React from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

const CreativeCoding: React.FC = () => {
  const items: Item[] = [
    { id: 1, name: "Generative Art", description: "Generative art is a creative practice that uses algorithms and code to produce unique artworks. Instead of directly creating each piece, artists set rules and parameters, allowing systems to generate visuals and patterns. This approach highlights the beauty of randomness and complexity, merging technology with artistic expression." },
    { id: 2, name: "Fractals", description: "Fractal generation is a visual art form that involves generating patterns based on self-similar transformations. These transformations can be applied repeatedly to produce complex and intricate designs. Fractal art is often used in creative coding to create abstract and realistic images." },
    { id: 3, name: "Visualizations", description: "Visualization is the process of transforming data into visual representations, such as graphs, charts, or maps. Visualizations can be used to convey information in a clear and concise manner, making them a valuable tool for data analysis and presentation." },
    { id: 4, name: "Simulations", description: "Simulation is a technique that involves creating models or systems that are designed to mimic real-world scenarios. These simulations can be used for research, design, or as a tool for modeling and analyzing complex systems." }
  ];

  return (
    <div className="p-0 sm:p-3 md:p-10 py-20 flex flex-col items-center">
      <h2 className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-sans font-bold tracking-tight text-center text-foreground">
        What is <br /> Creative Coding?
      </h2>
      <p className="text-xl mt-5 w-fit text-center bg-muted text-muted-foreground px-5 py-2 rounded-md border border-border">
        An approach to programming that emphasizes creativity and artistry.
      </p>

      <div className="w-full flex justify-center mt-20">
        <div className="grid md:grid-cols-2 w-full text-lg max-w-[900px] gap-10">
          {items.map((item) => (
            <div key={item.id} className="bg-card text-card-foreground p-5 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-semibold mb-2">{item.name}</h3>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeCoding;
