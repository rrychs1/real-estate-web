"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/propiedades?q=${encodeURIComponent(searchTerm)}`);
        } else {
            router.push(`/propiedades`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
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
    );
}
