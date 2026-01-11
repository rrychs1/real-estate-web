import Link from "next/link";
import { Building, Plus, Users, BarChart3, Settings } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { Property } from "@/types/sanity";

// Set revalidation time (e.g., 60 seconds) or use no-store
export const revalidate = 0;

async function getAdminData() {
    const propertiesQuery = `*[_type == "property"] | order(_createdAt desc) {
        _id,
        title,
        price,
        currency,
        "location": location.city + ", " + location.neighborhood,
        mainImage,
        operationType
    }`;
    const countQuery = `count(*[_type == "property"])`;

    // We can run promises in parallel
    try {
        const [properties, totalProperties] = await Promise.all([
            client.fetch<Property[]>(propertiesQuery, {}, { cache: 'no-store' }),
            client.fetch<number>(countQuery, {}, { cache: 'no-store' })
        ]);

        return {
            properties,
            stats: {
                totalProperties: totalProperties,
                visits: 1250, // Placeholder
                newContacts: 15 // Placeholder
            }
        };
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return {
            properties: [],
            stats: {
                totalProperties: 0,
                visits: 0,
                newContacts: 0
            }
        };
    }
}

export default async function AdminDashboard() {
    const { properties, stats } = await getAdminData();
    const { totalProperties, visits, newContacts } = stats;

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Panel de Administración</h1>
                    <p className="text-gray-500">Bienvenido de nuevo, Administrador.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Propiedades Totales</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalProperties}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <Building size={24} />
                        </div>
                    </div>
                    {/* Placeholder Stats */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Visitas este mes</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{visits}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Contactos Nuevos</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{newContacts}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Configuración</span>
                            <p className="text-sm font-medium text-gray-900 mt-1">General</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center">
                            <Settings size={24} />
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Action Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Gestión de Propiedades</h2>
                                <div className="flex gap-2">
                                    <Link
                                        href="/studio/structure"
                                        target="_blank"
                                        className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Settings size={16} /> Abrir CMS (Studio)
                                    </Link>
                                    <Link
                                        href="/admin/propiedades/crear"
                                        className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Plus size={16} /> Agregar Propiedad (UI)
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 font-medium rounded-tl-lg">Propiedad</th>
                                            <th className="px-4 py-3 font-medium">Estado</th>
                                            <th className="px-4 py-3 font-medium">Precio</th>
                                            <th className="px-4 py-3 font-medium rounded-tr-lg">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {properties.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                    No hay propiedades registradas aún.
                                                </td>
                                            </tr>
                                        ) : (
                                            properties.map((property: any) => (
                                                <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                                                                {property.mainImage && (
                                                                    <img
                                                                        src={urlFor(property.mainImage).width(80).url()}
                                                                        alt={property.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-900 text-sm line-clamp-1">{property.title}</p>
                                                                <p className="text-gray-500 text-xs">{property.location}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${property.operationType === 'venta' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                            {property.operationType === 'venta' ? 'Venta' : 'Alquiler'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: property.currency || 'COP', maximumFractionDigits: 0 }).format(property.price)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Link
                                                            href={`/studio/structure/property;${property._id}`}
                                                            target="_blank"
                                                            className="text-primary hover:text-secondary text-sm font-medium"
                                                        >
                                                            Editar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Recent Leads (Static for now, implies separate DB/Service) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Últimos Mensajes</h2>
                        <div className="space-y-4">
                            {[1].map((i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                                        SYS
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start w-full">
                                            <p className="font-semibold text-gray-900 text-sm">Sistema</p>
                                            <span className="text-gray-400 text-xs">Ahora</span>
                                        </div>
                                        <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                                            Los mensajes de contacto se enviarán a tu correo configurado.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
