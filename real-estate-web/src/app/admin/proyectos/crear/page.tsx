"use client";

import { useState } from "react";
import { Upload, X, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: {
            city: "",
            neighborhood: "",
            address: ""
        },
        features: {
            stratum: "",
            deliveryDate: "",
            units: ""
        },
        priceRange: {
            minPrice: "",
            maxPrice: "",
            currency: "COP"
        },
        amenities: [] as string[],
        images: [] as string[],
        videos: [] as string[]
    });

    const handleBasicChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: { ...prev.location, [name]: value }
        }));
    };

    const handleFeatureChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            features: { ...prev.features, [name]: value }
        }));
    };

    const handlePriceChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            priceRange: { ...prev.priceRange, [name]: value }
        }));
    };

    const toggleAmenity = (amenity: string) => {
        setFormData(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handleImageUpload = async (e: any) => {
        const files = e.target.files;
        if (!files) return;

        setLoading(true);
        const newImageIds: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const uploadData = new FormData();
                uploadData.append("file", file);

                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: uploadData
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        newImageIds.push(data.asset._id);
                    }
                }
            }

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImageIds]
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
            setError("Error al subir multimedia");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/proyectos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al crear el proyecto");
            }

            router.push("/admin");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al guardar el proyecto");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-20 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-500 hover:text-gray-900">
                            <X size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Nuevo Proyecto</h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.back()}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 flex items-center gap-2 text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <Save size={16} /> {loading ? "Guardando..." : "Guardar Proyecto"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3">
                        <AlertCircle className="text-red-500" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Información del Proyecto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleBasicChange}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Ej: Altos del Parque"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleBasicChange}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Ubicación</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                <input name="city" value={formData.location.city} onChange={handleLocationChange} type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Barrio</label>
                                <input name="neighborhood" value={formData.location.neighborhood} onChange={handleLocationChange} type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Exacta</label>
                                <input name="address" value={formData.location.address} onChange={handleLocationChange} type="text" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Detalles y Precios</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estrato</label>
                                <input name="stratum" value={formData.features.stratum} onChange={handleFeatureChange} type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega</label>
                                <input name="deliveryDate" value={formData.features.deliveryDate} onChange={handleFeatureChange} type="text" placeholder="Ej: 2025" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Unidades</label>
                                <input name="units" value={formData.features.units} onChange={handleFeatureChange} type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Desde</label>
                                <input name="minPrice" value={formData.priceRange.minPrice} onChange={handlePriceChange} type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Hasta</label>
                                <input name="maxPrice" value={formData.priceRange.maxPrice} onChange={handlePriceChange} type="number" className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                                <select name="currency" value={formData.priceRange.currency} onChange={handlePriceChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary">
                                    <option value="COP">Peso Colombiano</option>
                                    <option value="USD">Dólar</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Amenities del Proyecto</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {['Piscina', 'Gimnasio', 'Salón Comunal', 'Parque Infantil', 'Zonas Verdes', 'BBQ', 'Coworking', 'Lobby', 'Vigilancia 24h'].map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => toggleAmenity(amenity)}
                                        className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-600 text-sm">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Multimedia</h2>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {formData.images.map((id, index) => (
                                    <div key={index} className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative">
                                        <span className="text-xs text-gray-500">Img {index + 1}</span>
                                    </div>
                                ))}
                                <label className="w-24 h-24 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors">
                                    <Upload size={24} className="mb-1" />
                                    <span className="text-xs">Subir</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">Selecciona múltiples imágenes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
