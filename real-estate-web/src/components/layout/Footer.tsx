import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white pt-12 pb-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Raiz Rentable</h3>
                        <p className="text-gray-200 text-sm leading-relaxed mb-4 max-w-xs">
                            Tu aliado confiable en bienes raíces. Encontramos el espacio perfecto
                            para tu estilo de vida o inversión.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-secondary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-white hover:text-secondary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-white hover:text-secondary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link href="/propiedades" className="hover:text-secondary transition-colors">
                                    Propiedades en Venta
                                </Link>
                            </li>
                            <li>
                                <Link href="/propiedades?tipo=alquiler" className="hover:text-secondary transition-colors">
                                    Propiedades en Alquiler
                                </Link>
                            </li>
                            <li>
                                <Link href="/proyectos" className="hover:text-secondary transition-colors">
                                    Proyectos de Inversión
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="hover:text-secondary transition-colors">
                                    Contáctanos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contacto</h4>
                        <ul className="space-y-3 text-sm text-gray-200">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5" />
                                <span>
                                    Av. Principal 123, Oficina 404
                                    <br />
                                    Ciudad Empresarial
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} />
                                <a href="tel:+123456789" className="hover:text-secondary">
                                    +1 234 567 890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} />
                                <a href="mailto:info@raizrentable.com" className="hover:text-secondary">
                                    info@raizrentable.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-6 text-center text-xs text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Raiz Rentable. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
