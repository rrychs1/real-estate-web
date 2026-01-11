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
                        <Link href="/" className="text-2xl font-serif font-bold text-primary">
                            Raiz Rentable
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="tel:+123456789"
                            className="bg-primary text-white hover:bg-opacity-90 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Phone size={16} />
                            <span>Contáctanos</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-primary focus:outline-none p-2"
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full font-serif">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-primary hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="tel:+123456789"
                            className="w-full text-center mt-4 bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90"
                        >
                            Contáctanos
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
