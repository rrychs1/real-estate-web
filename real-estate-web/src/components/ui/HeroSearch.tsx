"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export function HeroSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [operationType, setOperationType] = useState<'venta' | 'alquiler'>('venta');

    const handleSearch = () => {
        let url = `/propiedades?type=${operationType}`;
        if (searchTerm.trim()) {
            url += `&q=${encodeURIComponent(searchTerm)}`;
        }
        router.push(url);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-xl p-6 rounded-card shadow-2xl shadow-slate-900/5 border border-white/20 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Tabs */}
            <div className="flex p-1.5 bg-slate-100/80 rounded-2xl w-fit">
                <button
                    onClick={() => setOperationType('venta')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${operationType === 'venta'
                        ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                        }`}
                >
                    Comprar
                </button>
                <button
                    onClick={() => setOperationType('alquiler')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${operationType === 'alquiler'
                        ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                        }`}
                >
                    Alquilar
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" size={22} />
                    <input
                        type="text"
                        placeholder="Ubicación, barrio o ciudad..."
                        className="w-full pl-14 pr-4 py-4 rounded-button bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:outline-none text-gray-800 placeholder:text-gray-400 transition-all duration-300 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Buscar propiedades por ubicación"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-button font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                    aria-label="Realizar búsqueda"
                >
                    <Search size={22} />
                    <span>Buscar</span>
                </button>
            </div>
        </div>
    );
}
