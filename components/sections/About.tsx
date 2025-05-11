export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About AgileCoder</h2>

          <p className="text-lg text-gray-700 mb-8">
            AgileCoder was founded by a single passionate developer with a vision for building powerful yet simple software.
            What started as a solo endeavor has grown into a collective of developers committed to helping others build better applications, faster.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <h3 className="font-bold text-black text-lg mb-1">Innovation</h3>
              <p className="text-gray-600">Pushing boundaries</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-black text-lg mb-1">Craftsmanship</h3>
              <p className="text-gray-600">Attention to detail</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-black text-lg mb-1">Community</h3>
              <p className="text-gray-600">Giving back</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-black text-lg mb-1">Education</h3>
              <p className="text-gray-600">Sharing knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
