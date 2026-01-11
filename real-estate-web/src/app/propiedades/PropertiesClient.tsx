"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Filter, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Property } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface PropertiesClientProps {
    properties: Property[];
}

export default function PropertiesClient({ properties }: PropertiesClientProps) {
    const [activeType, setActiveType] = useState<'todos' | 'venta' | 'alquiler'>('todos');
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get filters from URL or default
    const query = searchParams.get('q')?.toLowerCase() || "";
    const locationFilter = searchParams.get('location')?.toLowerCase() || "";

    const filteredProperties = properties.filter(property => {
        const matchesType = activeType === 'todos' || property.operationType === activeType;
        const matchesQuery = query === "" ||
            property.title.toLowerCase().includes(query) ||
            property.location.city.toLowerCase().includes(query) ||
            (property.location.neighborhood || "").toLowerCase().includes(query);
        const matchesLocation = locationFilter === "" || property.location.city.toLowerCase().includes(locationFilter);

        return matchesType && matchesQuery && matchesLocation;
    });

    // Handle filter changes that should update URL
    const handleLocationChange = (newLocation: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newLocation && newLocation !== "Todas las ciudades") {
            params.set("location", newLocation);
        } else {
            params.delete("location");
        }
        router.push(`/propiedades?${params.toString()}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header / Title Section */}
            <div className="bg-white shadow-sm py-8 mb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Propiedades Disponibles</h1>
                    <p className="text-gray-500 mt-2">
                        {query
                            ? `Resultados para "${query}"`
                            : "Encuentra el lugar perfecto en nuestra exclusiva selección."}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-gray-900 border-b pb-4">
                                <Filter size={20} className="text-primary" />
                                <h2 className="font-bold text-lg">Filtros</h2>
                            </div>

                            {/* Type Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-700 mb-3">Tipo de Operación</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={activeType === 'todos'}
                                            onChange={() => setActiveType('todos')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-gray-600">Todos</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={activeType === 'venta'}
                                            onChange={() => setActiveType('venta')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-gray-600">Venta</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={activeType === 'alquiler'}
                                            onChange={() => setActiveType('alquiler')}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-gray-600">Alquiler</span>
                                    </label>
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-700 mb-3">Ubicación</h3>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-primary"
                                        onChange={(e) => handleLocationChange(e.target.value)}
                                        value={locationFilter || "Todas las ciudades"}
                                    >
                                        <option>Todas las ciudades</option>
                                        <option value="bogotá">Bogotá</option>
                                        <option value="medellín">Medellín</option>
                                        <option value="chía">Chía</option>
                                        <option value="cali">Cali</option>
                                        <option value="cartagena">Cartagena</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content Type */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProperties.map((property) => (
                                // Mapping Sanity property to Component props if needed, or update PropertyCard to accept Sanity type
                                <PropertyCard
                                    key={property._id}
                                    property={{
                                        id: property._id,
                                        title: property.title,
                                        type: property.operationType,
                                        price: property.price,
                                        // Use urlFor for image, handle nulls
                                        image: property.mainImage ? urlFor(property.mainImage).url() : "https://images.unsplash.com/photo-1600596542815-27b88e39e140?auto=format&fit=crop&q=80&w=800",
                                        location: {
                                            city: property.location.city,
                                            neighborhood: property.location.neighborhood || ""
                                        },
                                        features: {
                                            area: property.area,
                                            bedrooms: property.rooms,
                                            bathrooms: property.bathrooms
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        {filteredProperties.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">No se encontraron propiedades con estos filtros.</p>
                                <button
                                    onClick={() => setActiveType('todos')}
                                    className="text-primary font-medium mt-2 hover:underline"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
