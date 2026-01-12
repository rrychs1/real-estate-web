import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { MapPin, ArrowLeft, Phone, Mail, Check, Calendar, Building, Layers } from "lucide-react";

interface Project {
    _id: string;
    title: string;
    description: string;
    slug: { current: string };
    priceRange: {
        minPrice: number;
        maxPrice: number;
        currency: 'COP' | 'USD';
    };
    location: {
        city: string;
        neighborhood?: string;
        address?: string;
    };
    features: {
        stratum: number;
        deliveryDate: string;
        units: number;
    };
    amenities: string[];
    mainImage: any;
    gallery?: any[];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
    const query = `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        description,
        slug,
        priceRange,
        location,
        features,
        amenities,
        mainImage,
        gallery
    }`;
    return client.fetch(query, { slug }, { cache: 'no-store' });
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const project = await getProject(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb / Back Navigation */}
            <div className="bg-white border-b border-gray-100 sticky top-20 z-40">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/proyectos" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-1" /> Volver a Proyectos
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2 bg-primary">
                                        En Venta
                                    </span>
                                    <h1 className="text-3xl font-bold font-serif text-gray-900">{project.title}</h1>
                                    <div className="flex items-center text-gray-500 mt-2">
                                        <MapPin size={18} className="mr-1 text-secondary" />
                                        <span>{project.location.address ? `${project.location.address}, ` : ''}{project.location.neighborhood ? `${project.location.neighborhood}, ` : ''}{project.location.city}</span>
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                    <span className="block text-xs text-gray-500 uppercase">Precios Desde</span>
                                    <p className="text-3xl font-bold text-primary">
                                        {formatPrice(project.priceRange.minPrice, project.priceRange.currency)}
                                    </p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Entrega</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Calendar size={20} className="text-secondary" />
                                        <span>{project.features.deliveryDate}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Unidades</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Building size={20} className="text-secondary" />
                                        <span>{project.features.units} Unid.</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Estrato</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Layers size={20} className="text-secondary" />
                                        <span>{project.features.stratum}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 h-[400px] md:h-[500px] relative group">
                            {project.mainImage ? (
                                <Image
                                    src={urlFor(project.mainImage).url()}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Sin Imagen</div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                1/{project.gallery ? project.gallery.length + 1 : 1} Fotos
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-bold font-serif mb-4 text-gray-900 border-b pb-2">Sobre el Proyecto</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p className="whitespace-pre-line">{project.description}</p>
                            </div>

                            {project.amenities && project.amenities.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h3 className="text-lg font-bold font-serif mb-4 text-gray-900">Amenidades y Zonas Comunes</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {project.amenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <Check size={16} className="text-primary" />
                                                <span className="capitalize">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Contact */}
                    <aside className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold font-serif mb-4 text-gray-900">Solicitar Información</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Recibe asesoría personalizada sobre precios, planos y opciones de financiación para <span className="font-bold text-gray-800">{project.title}</span>.
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    <span className="text-xs font-bold text-gray-500">Sala</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Sala de Ventas</p>
                                    <p className="text-xs text-secondary font-medium uppercase">Horario: 9am - 6pm</p>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="Tu nombre completo" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input type="tel" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="+57 300 ..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="ejemplo@correo.com" />
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Mail size={18} />
                                    Enviar Datos
                                </button>
                                <button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Phone size={18} />
                                    Contactar por WhatsApp
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
