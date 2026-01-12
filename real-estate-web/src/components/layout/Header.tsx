"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Propiedades", href: "/propiedades" },
        { name: "Proyectos", href: "/proyectos" },
        { name: "Contacto", href: "/contacto" },
    ];

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50 supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-serif font-bold text-gray-800 tracking-tight hover:text-primary transition-colors">
                            Raiz Rentable
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-primary hover:bg-gray-50/50 px-4 py-2 rounded-button text-sm font-medium transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="https://wa.me/573001234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128c7e] text-white px-6 py-2.5 rounded-button text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg hover:shadow-xl shadow-green-500/20"
                        >
                            <Phone size={18} className="fill-current" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full font-serif shadow-xl animate-in slide-in-from-top-5">
                    <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-4 py-3 rounded-xl text-lg font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/573001234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center mt-6 bg-[#25D366] text-white block px-4 py-3 rounded-xl text-lg font-bold hover:bg-[#128c7e] shadow-md"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
