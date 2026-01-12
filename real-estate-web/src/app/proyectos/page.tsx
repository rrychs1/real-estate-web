import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

async function getProjects() {
    return await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        description,
        slug,
        "mainImage": mainImage.asset->url,
        "location": location.city + ", " + location.neighborhood,
        features,
        priceRange,
        "status": "En Venta" 
    }`, {}, { cache: 'no-store' });
}

export default async function ProjectsPage() {
    const projects = await getProjects();

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
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No hay proyectos disponibles en este momento.</p>
                        <p className="text-gray-400 text-sm mt-2">¡Vuelve pronto para ver nuevas oportunidades de inversión!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project: any) => (
                            <div key={project._id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                <div className="h-64 overflow-hidden relative shrink-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${project.mainImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'})` }}
                                    ></div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                        {project.features?.deliveryDate ? `Entrega ${project.features.deliveryDate}` : 'En Venta'}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold font-serif mb-2 line-clamp-1">{project.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>

                                    <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4 mt-auto">
                                        <div className="text-center w-1/2 border-r border-gray-100">
                                            <span className="block text-xs text-gray-400 uppercase">Ubicación</span>
                                            <span className="font-bold text-gray-800 text-sm block truncate px-2">{project.location}</span>
                                        </div>
                                        <div className="text-center w-1/2">
                                            <span className="block text-xs text-gray-400 uppercase">Desde</span>
                                            <span className="font-bold text-secondary text-sm">
                                                {new Intl.NumberFormat('es-CO', {
                                                    style: 'currency',
                                                    currency: project.priceRange?.currency || 'COP',
                                                    maximumFractionDigits: 0,
                                                    notation: "compact"
                                                }).format(project.priceRange?.minPrice || 0)}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/proyectos/${project.slug?.current}`}
                                        className="w-full py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        Ver Proyecto <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
