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
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-serif font-bold text-primary tracking-tight">
                            Raiz Rentable
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary hover:bg-primary/5 px-4 py-2.5 rounded-full text-base font-medium transition-all duration-300"
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
                            className="bg-[#25D366] hover:bg-[#128c7e] text-white px-6 py-2.5 rounded-full text-base font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <Phone size={20} className="fill-current" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-primary focus:outline-none p-2"
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full font-serif shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-4 py-3 rounded-lg text-lg font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/573001234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center mt-6 bg-[#25D366] text-white block px-4 py-3 rounded-lg text-lg font-bold hover:bg-[#128c7e] shadow-md"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
