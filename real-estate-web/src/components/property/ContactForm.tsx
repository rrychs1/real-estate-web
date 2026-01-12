"use client";

import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

interface ContactFormProps {
    propertyTitle: string;
    propertyId: string;
}

export default function ContactForm({ propertyTitle, propertyId }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                propertyId,
                propertyTitle,
                type: 'property_inquiry'
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-600 text-sm">
                    Gracias por tu interés en <strong>{propertyTitle}</strong>. Nuestro agente te contactará pronto.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm text-green-700 underline hover:text-green-800"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
                <p className="text-red-600 text-sm">Hubo un problema al enviar. Intenta nuevamente.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm text-red-700 underline hover:text-red-800"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    name="name"
                    required
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Tu nombre completo"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    name="phone"
                    required
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="+57 300 ..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    defaultValue={`Hola, estoy interesado en ${propertyTitle}...`}
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                    </>
                ) : (
                    <>
                        <Mail size={18} />
                        Enviar Mensaje
                    </>
                )}
            </button>
            <button
                type="button"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => window.open('https://wa.me/573166671927?text=Hola,%20estoy%20interesado%20en%20' + encodeURIComponent(propertyTitle), '_blank')}
            >
                <Phone size={18} />
                Hablar por WhatsApp
            </button>
        </form>
    );
}
