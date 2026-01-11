import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <Link href={`/propiedades/${property.slug}`}>
                    <div className="relative h-full w-full">
                        {/* Fallback image if images array is empty or fails loading would be handled by Next/Image typically, 
                    but for now assuming valid URLs or using a placeholder strategy could be added later. 
                    Using simple img tag for external generic placeholder for now to avoid Next.js config complexity with remote patterns immediately 
                    if user hasn't configured next.config.ts for all domains.
                    ACTUALLY, using a div with background image is safer for arbitrary external URLs without config.
                */}
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80'})` }}
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${property.type === 'venta' ? 'bg-primary' : 'bg-secondary'}`}>
                                {property.type === 'venta' ? 'En Venta' : 'Alquiler'}
                            </span>
                            {property.isFeatured && (
                                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Destacado
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="text-white font-bold text-lg">
                                {formatPrice(property.price, property.currency)}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold font-serif text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={`/propiedades/${property.slug}`}>
                            {property.title}
                        </Link>
                    </h3>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={16} className="mr-1 text-secondary" />
                    <span className="line-clamp-1">{property.location.city}, {property.location.neighborhood}</span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5" title="Habitaciones">
                        <Bed size={18} className="text-gray-400" />
                        <span>{property.features.bedrooms} <span className="hidden sm:inline">Hab.</span></span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Baños">
                        <Bath size={18} className="text-gray-400" />
                        <span>{property.features.bathrooms} <span className="hidden sm:inline">Baños</span></span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Área">
                        <Square size={18} className="text-gray-400" />
                        <span>{property.features.area} m²</span>
                    </div>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-50">
                    <Link
                        href={`/propiedades/${property.slug}`}
                        className="block w-full text-center text-primary font-medium hover:text-secondary transition-colors text-sm"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
}
