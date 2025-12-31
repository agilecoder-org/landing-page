import Opening from '@/components/code-and-art-sections/Opening';
import CarAnimation from '@/components/code-and-art-sections/CarAnimation';
import CreativeCoding from '@/components/code-and-art-sections/CreativeCoding';
import Fractals from '@/components/code-and-art-sections/Fractals';
import Simulations from '@/components/code-and-art-sections/Simulations';
import Visualizations from '@/components/code-and-art-sections/Visualizations';
import Art from '@/components/code-and-art-sections/Art';

export const metadata = {
    title: 'Artful Coding | Programming meets Creativity',
    description:
        "Artful Coding explores the intersection of art and technology, showcasing the creative potential of programming through fractals, simulations, visualizations, and generative art. Dive into the world of creative coding where mathematical precision meets artistic expression. From intricate fractal designs to real-time physics simulations, Artful Coding highlights how code can be used to generate stunning visuals, unique artwork, and engaging interactive experiences. Discover the beauty of algorithms, data, and creativity as we push the boundaries of what’s possible with code.",
};

export default function CodeAndArtPage() {
    return (
        <div className="min-h-screen text-neutral-100 p-0">
            <Opening />
            <CarAnimation />
            <CreativeCoding />
            <Fractals />
            <Simulations />
            <Visualizations />
            <Art />
        </div>
    );
}
