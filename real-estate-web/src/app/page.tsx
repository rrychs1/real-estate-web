import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { HeroSearch } from "@/components/ui/HeroSearch";
import { HeroBackground } from "@/components/ui/HeroBackground";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Background Image with Enhanced Gradient Overlay */}
        <HeroBackground />

        <div className="relative z-10 container mx-auto px-4 text-center text-white mt-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-8 leading-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-forwards text-slate-100">
            Encuentra el Espacio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600">
              Donde Perteneces
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-12 max-w-2xl mx-auto text-balance font-light tracking-wide leading-relaxed animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-200 fill-mode-forwards">
            Propiedades exclusivas seleccionadas para un estilo de vida exigente.
            Compra, vende o alquila con la confianza de los mejores.
          </p>

          {/* Search Box */}
          <HeroSearch />
        </div>
      </section>

      {/* Intro / Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Nuestros Servicios</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-800">¿Por qué elegir Raiz Rentable?</h2>
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
            <div key={idx} className="bg-white p-10 rounded-card shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <CheckCircle size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-serif text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section (Featured Preview) */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/50 -skew-x-12 translate-x-32" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-slate-800 leading-tight">
              Descubre Nuestras <br />
              <span className="text-primary">Propiedades Destacadas</span>
            </h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-lg">
              Explora una selección curada de casas y apartamentos que redefinen el lujo y la comodidad. Cada espacio cuenta una historia única.
            </p>
            <Link
              href="/propiedades"
              className="inline-flex items-center gap-3 bg-white text-slate-800 px-8 py-4 rounded-button font-bold shadow-md hover:shadow-lg transition-all hover:text-primary group border border-slate-100"
            >
              Ver Catálogo Completo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            {/* Placeholder for property images montage */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-72 rounded-2xl bg-slate-300 bg-cover bg-center shadow-xl image-gradual transform translate-y-4"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop")' }}
              />
              <div
                className="h-72 rounded-2xl bg-slate-300 bg-cover bg-center shadow-xl image-gradual transform -translate-y-4"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop")' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
