import Link from "next/link"

export default function Hero() {
  return (
    <section id="hero" className="bg-black py-20 md:py-32 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Innovate. Build. Deliver.</h1>
        <p className="text-md md:text-xl text-gray-400 max-w-2xl mb-10">
          From cutting-edge dev tools and plugins to full-fledged websites — we craft and ship modern digital experiences at speed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#explore"
            className="bg-white text-black hover:bg-gray-300 font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Explore
          </Link>
          <Link
            href="#contact"
            className="bg-transparent border-[0.5px] hover:bg-slate-800 border-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}
