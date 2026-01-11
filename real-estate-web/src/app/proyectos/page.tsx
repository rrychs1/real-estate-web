import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "Torre Empresarial 93",
            description: "Oficinas inteligentes en el corazón financiero. Alta valorización garantizada.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
            status: "En Construcción",
            completion: "2025",
            roi: "12% E.A."
        },
        {
            id: 2,
            title: "Reserva del Bosque",
            description: "Apartamentos rodeados de naturaleza a 15 min de la ciudad. Calidad de vida superior.",
            image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80",
            status: "En Planos",
            completion: "2026",
            roi: "15% Plusvalía"
        },
        {
            id: 3,
            title: "Mall Comercial Plaza Norte",
            description: "Locales comerciales en zona de expansión urbana de alta densidad.",
            image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce9?auto=format&fit=crop&q=80",
            status: "Entrega Inmediata",
            completion: "2024",
            roi: "8% Renta"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Hero Banner */}
            <div className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-secondary font-bold tracking-wider uppercase mb-2 block">Inversión Inteligente</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Proyectos Destacados</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Descubre oportunidades de inversión en desarrollo con alto potencial de valorización y rentabilidad.
                    </p>
                </div>
            </div>

            {/* Benefits */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Alta Valorización</h3>
                        <p className="text-gray-500 text-sm">Proyectos ubicados en zonas de desarrollo estratégico.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <Shield size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Respaldo Total</h3>
                        <p className="text-gray-500 text-sm">Constructores con trayectoria y fiduciaria garantizada.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Plazos Flexibles</h3>
                        <p className="text-gray-500 text-sm">Facilidades de pago durante la etapa de construcción.</p>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="h-64 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                ></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                    {project.status}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-serif mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                                    <div className="text-center">
                                        <span className="block text-xs text-gray-400 uppercase">Entrega</span>
                                        <span className="font-bold text-gray-800">{project.completion}</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xs text-gray-400 uppercase">Retorno Est.</span>
                                        <span className="font-bold text-secondary">{project.roi}</span>
                                    </div>
                                </div>

                                <button className="w-full py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                                    Solicitar Información <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
