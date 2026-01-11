import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { Bed, Bath, Square, MapPin, ArrowLeft, Phone, Mail, Check } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const property = MOCK_PROPERTIES.find(p => p.slug === resolvedParams.slug);

    if (!property) {
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
                    <Link href="/propiedades" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-1" /> Volver al listado
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
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2 ${property.type === 'venta' ? 'bg-primary' : 'bg-secondary'}`}>
                                        {property.type === 'venta' ? 'En Venta' : 'Alquiler'}
                                    </span>
                                    <h1 className="text-3xl font-bold font-serif text-gray-900">{property.title}</h1>
                                    <div className="flex items-center text-gray-500 mt-2">
                                        <MapPin size={18} className="mr-1 text-secondary" />
                                        <span>{property.location.address}, {property.location.neighborhood}, {property.location.city}</span>
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="text-3xl font-bold text-primary">
                                        {formatPrice(property.price, property.currency)}
                                    </p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Area</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Square size={20} className="text-secondary" />
                                        <span>{property.features.area} m²</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Habitaciones</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Bed size={20} className="text-secondary" />
                                        <span>{property.features.bedrooms}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Baños</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <Bath size={20} className="text-secondary" />
                                        <span>{property.features.bathrooms}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">Parqueaderos</span>
                                    <div className="flex items-center font-semibold text-gray-800 gap-2">
                                        <div className="bg-secondary rounded-sm w-5 h-5 flex items-center justify-center text-white text-xs font-bold">P</div>
                                        <span>{property.features.parking}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery (Main Image Mock) */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 h-[400px] md:h-[500px] relative group">
                            <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                                priority
                            />
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                1/5 Fotos
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-bold font-serif mb-4 text-gray-900 border-b pb-2">Descripción</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p>{property.description}</p>
                                <p className="mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="mt-4">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Contact */}
                    <aside className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold font-serif mb-4 text-gray-900">¿Te interesa?</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Contacta a un asesor especializado sobre esta propiedad ref: <span className="font-mono text-gray-800">{String(property.id).padStart(4, '0')}</span>
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    {/* Agent avatar placeholder */}
                                    <span className="text-xs font-bold text-gray-500">Agente</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Carlos Rodríguez</p>
                                    <p className="text-xs text-secondary font-medium uppercase">Asesor Senior</p>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors" defaultValue={`Hola, estoy interesado en ${property.title}...`}></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Mail size={18} />
                                    Enviar Mensaje
                                </button>
                                <button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Phone size={18} />
                                    Hablar por WhatsApp
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
