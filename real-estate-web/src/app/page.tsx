import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Placeholder for background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2069&auto=format&fit=crop")' }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight text-balance">
            Encuentra el Espacio <br /> Donde Perteneces
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-balance">
            Propiedades exclusivas seleccionadas para un estilo de vida exigente.
            Compra, vende o alquila con la confianza de los mejores.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Ubicación, ciudad o código postal"
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none text-gray-800"
              />
            </div>
            <button className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Intro / Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Nuestros Servicios</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 text-gray-900">¿Por qué elegir Raiz Rentable?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Exclusividad",
              description: "Acceso a propiedades off-market y desarrollos premium.",
            },
            {
              title: "Asesoría Integral",
              description: "Acompañamiento legal, financiero y comercial en cada paso.",
            },
            {
              title: "Rentabilidad",
              description: "Oportunidades de inversión con alto retorno garantizado.",
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section (Featured Preview) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-900">Descubre Nuestras Propiedades Destacadas</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Explora una selección curada de casas y apartamentos que redefinen el lujo y la comodidad.
            </p>
            <Link
              href="/propiedades"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
            >
              Ver Catálogo Completo <ArrowRight size={20} />
            </Link>
          </div>
          <div className="md:w-1/2">
            {/* Placeholder for property images montage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-lg bg-gray-300 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop")' }}></div>
              <div className="h-64 rounded-lg bg-gray-300 bg-cover bg-center mt-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop")' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
