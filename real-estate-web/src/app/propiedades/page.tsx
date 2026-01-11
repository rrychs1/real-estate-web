"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { Filter, ChevronDown } from "lucide-react";

export default function PropertiesPage() {
    const [activeType, setActiveType] = useState<'todos' | 'venta' | 'alquiler'>('todos');

    const filteredProperties = activeType === 'todos'
        ? MOCK_PROPERTIES
        : MOCK_PROPERTIES.filter(p => p.type === activeType);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header / Title Section */}
            <div className="bg-white shadow-sm py-8 mb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Propiedades Disponibles</h1>
                    <p className="text-gray-500 mt-2">Encuentra el lugar perfecto en nuestra exclusiva selección.</p>
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

                            {/* Location Placeholder */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-700 mb-3">Ubicación</h3>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-primary">
                                        <option>Todas las ciudades</option>
                                        <option>Bogotá</option>
                                        <option>Medellín</option>
                                        <option>Chía</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Price Range Placeholder */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Rango de Precio</h3>
                                <div className="flex items-center gap-2">
                                    <input type="text" placeholder="Min" className="w-full p-2 text-sm border border-gray-200 rounded bg-gray-50" />
                                    <span className="text-gray-400">-</span>
                                    <input type="text" placeholder="Max" className="w-full p-2 text-sm border border-gray-200 rounded bg-gray-50" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content Type */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
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
