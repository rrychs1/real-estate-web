import { Mail, Phone, MapPin } from "lucide-react";
import GlobalContactForm from "@/components/common/GlobalContactForm";

export default function ContactPage() {
    return (
        <div className="bg-white pb-16">
            <div className="bg-gray-50 py-12 mb-12 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Contáctanos</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Estamos listos para asesorarte en la búsqueda de tu propiedad ideal.
                        Escríbenos y un experto se pondrá en contacto contigo.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">Información de Contacto</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Nuestra Oficina</h3>
                                    <p className="text-gray-600">Av. Principal 123, Oficina 404<br />Ciudad Empresarial, Bogotá</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Llámanos</h3>
                                    <p className="text-gray-600">
                                        <a href="https://wa.me/576011234567" target="_blank" rel="noopener noreferrer" className="hover:text-secondary block">+57 (601) 123 4567 (WhatsApp)</a>
                                        <a href="https://wa.me/573009876543" target="_blank" rel="noopener noreferrer" className="hover:text-secondary block">+57 300 987 6543 (WhatsApp)</a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Escríbenos</h3>
                                    <p className="text-gray-600">
                                        <a href="mailto:info@raizrentable.com" className="hover:text-secondary">info@raizrentable.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="font-semibold text-lg mb-2">Horario de Atención</h3>
                            <p className="text-gray-600 text-sm">
                                <span className="font-medium block">Lunes a Viernes:</span> 8:00 AM - 6:00 PM
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                                <span className="font-medium block">Sábados:</span> 9:00 AM - 1:00 PM
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">Envíanos un mensaje</h2>
                        <GlobalContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
