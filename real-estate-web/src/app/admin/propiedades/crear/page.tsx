"use client";

import { useState } from "react";
import { Upload, X, Save } from "lucide-react";
import Link from "next/link";

export default function CreatePropertyPage() {
    // Simple state for demonstration
    const [images, setImages] = useState<string[]>([]);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-20 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-500 hover:text-gray-900">
                            <X size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Nueva Propiedad</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm">
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 flex items-center gap-2 text-sm">
                            <Save size={16} /> Guardar Propiedad
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="grid grid-cols-1 gap-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Información Básica</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Publicación</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" placeholder="Ej: Apartamento con vista al mar" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <input type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                                <select className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary">
                                    <option value="COP">Peso Colombiano (COP)</option>
                                    <option value="USD">Dólar (USD)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Operación</label>
                                <select className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary">
                                    <option value="venta">Venta</option>
                                    <option value="alquiler">Alquiler</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <select className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary">
                                    <option value="apartamento">Apartamento</option>
                                    <option value="casa">Casa</option>
                                    <option value="oficina">Oficina</option>
                                    <option value="lote">Lote / Terreno</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Ubicación</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Barrio</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (Privada)</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" placeholder="Solo visible para admin" />
                            </div>
                        </div>
                    </div>

                    {/* Features & Common Zones */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Características y Zonas Comunes</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                                <input type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                                <input type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                                <input type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parqueaderos</label>
                                <input type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Zonas Comunes</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Ascensor', 'Gimnasio', 'Piscina', 'Salón Comunal', 'BBQ', 'Parque Infantil', 'Vigilancia 24h', 'Zonas Verdes', 'Parqueadero Visitantes'].map((zone) => (
                                    <label key={zone} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300" />
                                        <span className="text-gray-600 text-sm">{zone}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                            <textarea rows={5} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"></textarea>
                        </div>
                    </div>

                    {/* Media (Grid Mode) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Multimedia (Imágenes y Videos)</h2>

                        {/* Images Grid */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Galería de Imágenes</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Placeholders for grid items */}
                                {[1, 2, 3].map((slot) => (
                                    <div key={slot} className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors relative group">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs">Agregar Foto</span>
                                    </div>
                                ))}
                                <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <span className="text-xs text-gray-400 text-center px-2">Más casillas se generarán automáticamente</span>
                                </div>
                            </div>
                        </div>

                        {/* Videos Grid */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Videos (YouTube/Vimeo)</label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input type="url" placeholder="https://youtube.com/..." className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm" />
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">Agregar</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400">
                                        <span className="text-xs">Vista previa del video</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
