"use client";

import { useState } from "react";

import { Upload, X, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        currency: "COP",
        operationType: "venta",
        category: "apartamento",
        location: {
            city: "",
            neighborhood: "",
            address: ""
        },
        features: {
            area: "",
            bedrooms: "",
            bathrooms: "",
            parking: ""
        },
        commonZones: [] as string[],
        description: "",
        images: [] as string[]
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

    const toggleCommonZone = (zone: string) => {
        setFormData(prev => {
            const zones = prev.commonZones.includes(zone)
                ? prev.commonZones.filter(z => z !== zone)
                : [...prev.commonZones, zone];
            return { ...prev, commonZones: zones };
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
            setError("Error al subir algunas imágenes");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/propiedades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al crear la propiedad");
            }

            router.push("/admin");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Hubo un error al guardar.");
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
                        <h1 className="text-xl font-bold text-gray-900">Nueva Propiedad</h1>
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
                            <Save size={16} /> {loading ? "Guardando..." : "Guardar Propiedad"}
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
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Información Básica</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Publicación</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleBasicChange}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Ej: Apartamento con vista al mar"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleBasicChange}
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleBasicChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                >
                                    <option value="COP">Peso Colombiano (COP)</option>
                                    <option value="USD">Dólar (USD)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Operación</label>
                                <select
                                    name="operationType"
                                    value={formData.operationType}
                                    onChange={handleBasicChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                >
                                    <option value="venta">Venta</option>
                                    <option value="alquiler">Alquiler</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleBasicChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                >
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
                                <input
                                    name="city"
                                    value={formData.location.city}
                                    onChange={handleLocationChange}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Barrio</label>
                                <input
                                    name="neighborhood"
                                    value={formData.location.neighborhood}
                                    onChange={handleLocationChange}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (Privada)</label>
                                <input
                                    name="address"
                                    value={formData.location.address}
                                    onChange={handleLocationChange}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Solo visible para admin"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features & Common Zones */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Características y Zonas Comunes</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                                <input
                                    name="area"
                                    value={formData.features.area}
                                    onChange={handleFeatureChange}
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                                <input
                                    name="bedrooms"
                                    value={formData.features.bedrooms}
                                    onChange={handleFeatureChange}
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                                <input
                                    name="bathrooms"
                                    value={formData.features.bathrooms}
                                    onChange={handleFeatureChange}
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parqueaderos</label>
                                <input
                                    name="parking"
                                    value={formData.features.parking}
                                    onChange={handleFeatureChange}
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Zonas Comunes</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Ascensor', 'Gimnasio', 'Piscina', 'Salón Comunal', 'BBQ', 'Parque Infantil', 'Vigilancia 24h', 'Zonas Verdes', 'Parqueadero Visitantes'].map((zone) => (
                                    <label key={zone} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.commonZones.includes(zone)}
                                            onChange={() => toggleCommonZone(zone)}
                                            className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                        />
                                        <span className="text-gray-600 text-sm">{zone}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleBasicChange}
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                            ></textarea>
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
