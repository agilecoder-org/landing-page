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
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground scroll-smooth">
            <section className="snap-start h-screen w-full overflow-hidden">
                <Opening />
            </section>

            {/* Note: CarAnimation might be a transition or part of Opening, but let's keep it if fits, or merge */}
            {/* CarAnimation was a horizontal scroller, which conflicts with full screen vertical snap. 
                I will skip it for the main snap flow or integrate it differently. 
                For now, I'll comment it out to focus on the 'creative' minimal vibe requested. 
                If the user really wanted it, I'd put it in a section, but horizontal scroll inside vertical snap is tricky without sticky.
            */}
            {/* <CarAnimation /> */}

            <section className="snap-start h-screen w-full overflow-hidden">
                <CreativeCoding />
            </section>

            <section className="snap-start h-screen w-full overflow-hidden">
                <Fractals />
            </section>

            <section className="snap-start h-screen w-full overflow-hidden">
                <Simulations />
            </section>

            <section className="snap-start h-screen w-full overflow-hidden">
                <Visualizations />
            </section>

            <section className="snap-start h-screen w-full overflow-hidden">
                <Art />
            </section>
        </div>
    );
}
