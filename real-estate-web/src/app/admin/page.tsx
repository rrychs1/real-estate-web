import Link from "next/link";
import { Building, Plus, Users, BarChart3, Settings } from "lucide-react";

export default function AdminDashboard() {
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
                            <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <Building size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Visitas este mes</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">12.5k</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Contactos Nuevos</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">45</p>
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
                                <Link
                                    href="/admin/propiedades/crear"
                                    className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-colors"
                                >
                                    <Plus size={16} /> Agregar Propiedad
                                </Link>
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
                                        {/* MOCK ROW 1 */}
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                                                        {/* Image Placeholder */}
                                                        <div className="absolute inset-0 bg-primary/20"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">Penthouse de Lujo</p>
                                                        <p className="text-gray-500 text-xs">Bogotá, Rosales</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Publicado
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                $1.250.000.000
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-primary hover:text-secondary text-sm font-medium">Editar</button>
                                            </td>
                                        </tr>
                                        {/* MOCK ROW 2 */}
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-secondary/20"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">Casa Campestre</p>
                                                        <p className="text-gray-500 text-xs">Chía, Fontanar</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Revisión
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                $850.000.000
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-primary hover:text-secondary text-sm font-medium">Editar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 text-center">
                                <Link href="/admin/propiedades" className="text-primary text-sm font-medium hover:underline">
                                    Ver todas las propiedades
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Recent Leads */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Últimos Mensajes</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                                        {['JD', 'AM', 'CR'][i - 1]}
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start w-full">
                                            <p className="font-semibold text-gray-900 text-sm">Juan David</p>
                                            <span className="text-gray-400 text-xs">2h</span>
                                        </div>
                                        <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                                            Hola, estoy interesado en conocer el precio final de...
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
