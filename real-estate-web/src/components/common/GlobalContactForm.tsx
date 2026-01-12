"use client";

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function GlobalContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get('name'),
                surname: formData.get('surname'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                type: 'global_contact'
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
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-600 mb-4 text-base">
                    Hemos recibido tu consulta. Nuestro equipo se pondrá en contacto contigo a la brevedad posible.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-green-700 underline hover:text-green-800 font-medium text-sm"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <h3 className="text-xl font-bold text-red-800 mb-2">Error al enviar</h3>
                <p className="text-red-600 mb-4">Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-red-700 underline hover:text-red-800 font-medium text-sm"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        name="name"
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                        name="surname"
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    name="phone"
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                <select name="subject" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors text-gray-600">
                    <option>Información general</option>
                    <option>Ventas</option>
                    <option>Arriendos</option>
                    <option>Proyectos</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                    </>
                ) : (
                    <>
                        Enviar Mensaje <Send size={20} />
                    </>
                )}
            </button>
        </form>
    );
}
