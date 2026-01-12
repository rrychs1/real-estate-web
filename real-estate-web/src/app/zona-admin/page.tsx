import Link from "next/link";
import { Building, Plus, Users, BarChart3, Settings } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { Property } from "@/types/sanity";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Simple auth check using cookie
async function isAuthenticated() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');
    return !!authCookie?.value;
}

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
    const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        priceRange,
        "location": location.city + ", " + location.neighborhood,
        mainImage
    }`;
    const countQuery = `count(*[_type == "property"])`;
    const countProjectsQuery = `count(*[_type == "project"])`;

    try {
        const [properties, projects, totalProperties, totalProjects] = await Promise.all([
            client.fetch<Property[]>(propertiesQuery, {}, { cache: 'no-store' }),
            client.fetch<any[]>(projectsQuery, {}, { cache: 'no-store' }),
            client.fetch<number>(countQuery, {}, { cache: 'no-store' }),
            client.fetch<number>(countProjectsQuery, {}, { cache: 'no-store' })
        ]);

        return {
            properties,
            projects,
            stats: {
                totalProperties,
                totalProjects,
                visits: 1250,
                newContacts: 15
            }
        };
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return {
            properties: [],
            projects: [],
            stats: {
                totalProperties: 0,
                totalProjects: 0,
                visits: 0,
                newContacts: 0
            }
        };
    }
}

// Login Form Component (shown when not authenticated)
function LoginForm() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Panel de Administración v2</h1>
                        <p className="text-gray-400 mt-2">Ingresa tus credenciales para continuar</p>
                    </div>

                    <form action="/api/zona-admin/auth" method="POST" className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ingresa tu usuario"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                        >
                            Ingresar
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Raiz Rentable © 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

export default async function AdminPage() {
    const isAuth = await isAuthenticated();

    // If not authenticated, show login form
    if (!isAuth) {
        return <LoginForm />;
    }

    // If authenticated, show dashboard
    const { properties, projects, stats } = await getAdminData();
    const { totalProperties, totalProjects, visits, newContacts } = stats;

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">Panel de Administración</h1>
                        <p className="text-gray-500">Bienvenido de nuevo, Administrador.</p>
                    </div>
                    <form action="/api/zona-admin/auth" method="POST" className="flex">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" className="bg-red-100 text-red-700 px-6 py-3 rounded-lg text-base font-bold hover:bg-red-200 transition-colors cursor-pointer shadow-sm border border-red-200">
                            Cerrar Sesión
                        </button>
                    </form>
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

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-gray-500 text-sm font-medium">Proyectos Totales</span>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalProjects}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                            <Building size={24} />
                        </div>
                    </div>

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
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Action Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* PROPERTIES TABLE */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Gestión de Propiedades</h2>
                                <div className="flex gap-2">
                                    <Link
                                        href="/zona-admin/propiedades/crear"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Plus size={16} /> Agregar Propiedad
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
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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

                        {/* PROJECTS TABLE */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Gestión de Proyectos</h2>
                                <div className="flex gap-2">
                                    <Link
                                        href="/zona-admin/proyectos/crear"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Plus size={16} /> Agregar Proyecto
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 font-medium rounded-tl-lg">Proyecto</th>
                                            <th className="px-4 py-3 font-medium">Ubicación</th>
                                            <th className="px-4 py-3 font-medium">Desde</th>
                                            <th className="px-4 py-3 font-medium rounded-tr-lg">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {projects.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                    No hay proyectos registradas aún.
                                                </td>
                                            </tr>
                                        ) : (
                                            projects.map((project: any) => (
                                                <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                                                                {project.mainImage && (
                                                                    <img
                                                                        src={urlFor(project.mainImage).width(80).url()}
                                                                        alt={project.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-900 text-sm line-clamp-1">{project.title}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {project.location}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: project.priceRange?.currency || 'COP', maximumFractionDigits: 0 }).format(project.priceRange?.minPrice || 0)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Link
                                                            href={`/studio/structure/project;${project._id}`}
                                                            target="_blank"
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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

                    {/* Sidebar */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Acciones Globales</h2>
                            </div>
                            <div className="space-y-3">
                                <Link
                                    href="/studio/structure"
                                    target="_blank"
                                    className="w-full bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-lg font-medium flex items-center justify-between gap-2 text-sm transition-colors"
                                >
                                    <span>Abrir Sanity Studio</span>
                                    <Settings size={16} />
                                </Link>

                                <form action="/api/zona-admin/auth" method="POST">
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <button
                                        type="submit"
                                        className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg font-medium flex items-center justify-between gap-2 text-sm transition-colors border border-red-200"
                                    >
                                        <span>Cerrar Sesión</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    </button>
                                </form>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-6">Últimos Mensajes</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4 pb-4 border-b border-gray-50">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
