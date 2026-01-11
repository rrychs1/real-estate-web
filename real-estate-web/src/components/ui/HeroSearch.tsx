"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-3xl mx-auto flex flex-col gap-4">
            <div className="flex gap-4 border-b border-gray-100 pb-2">
                <button
                    onClick={() => setOperationType('venta')}
                    className={`pb-2 text-sm font-semibold transition-colors ${operationType === 'venta' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Comprar
                </button>
                <button
                    onClick={() => setOperationType('alquiler')}
                    className={`pb-2 text-sm font-semibold transition-colors ${operationType === 'alquiler' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Alquilar
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Ubicación, ciudad o código postal"
                        className="w-full px-4 py-3 rounded-md bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none text-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Search size={20} />
                    Buscar
                </button>
            </div>
        </div>
    );
}
