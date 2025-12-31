import Opening from '@/components/code-and-art-sections/Opening';
import CarAnimation from '@/components/code-and-art-sections/CarAnimation';
import CreativeCoding from '@/components/code-and-art-sections/CreativeCoding';
import Fractals from '@/components/code-and-art-sections/Fractals';
import Simulations from '@/components/code-and-art-sections/Simulations';
import Visualizations from '@/components/code-and-art-sections/Visualizations';
import Art from '@/components/code-and-art-sections/Art';
import ImprovedFooter from '@/components/Footer';

export const metadata = {
    title: 'Artful Coding | Programming meets Creativity',
    description:
        "Artful Coding explores the intersection of art and technology, showcasing the creative potential of programming through fractals, simulations, visualizations, and generative art. Dive into the world of creative coding where mathematical precision meets artistic expression. From intricate fractal designs to real-time physics simulations, Artful Coding highlights how code can be used to generate stunning visuals, unique artwork, and engaging interactive experiences. Discover the beauty of algorithms, data, and creativity as we push the boundaries of what’s possible with code.",
};

export default function CodeAndArtPage() {
    return (
        <main className="min-h-screen w-full bg-background text-foreground">
            <section className="h-screen w-full overflow-hidden relative">
                <Opening />
            </section>

            <section className="w-full relative py-20 overflow-hidden">
                <CarAnimation />
            </section>

            <section className="h-screen w-full overflow-hidden relative">
                <CreativeCoding />
            </section>

            <section className="h-screen w-full overflow-hidden relative">
                <Fractals />
            </section>

            <section className="h-screen w-full overflow-hidden relative">
                <Simulations />
            </section>

            <section className="h-screen my-20 w-full overflow-hidden relative">
                <Visualizations />
            </section>

            <section className="h-screen my-20 w-full overflow-hidden relative">
                <Art />
            </section>

            <ImprovedFooter />
        </main>
    );
}
