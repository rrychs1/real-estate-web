import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Configurar el "transporte" (SMTP de Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Tu correo de Gmail
                pass: process.env.EMAIL_PASS, // Tu Contraseña de Aplicación
            },
        });

        // 2. Definir el contenido del correo según el tipo de formulario
        let subject = 'Nuevo Mensaje desde Raíz Rentable';
        let htmlContent = '';

        if (data.type === 'property_inquiry') {
            subject = `Consulta sobre Propiedad: ${data.propertyTitle}`;
            htmlContent = `
                <h2>Nueva consulta sobre propiedad</h2>
                <p><strong>Propiedad:</strong> ${data.propertyTitle}</p>
                <p><strong>ID:</strong> ${data.propertyId}</p>
                <hr/>
                <h3>Datos del interesado:</h3>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                <p><strong>Mensaje:</strong></p>
                <p><i>"${data.message}"</i></p>
            `;
        } else {
            subject = `Contacto General: ${data.subject || 'Sin asunto'}`;
            htmlContent = `
                <h2>Nuevo mensaje de contacto general</h2>
                <hr/>
                <h3>Datos del contacto:</h3>
                <p><strong>Nombre:</strong> ${data.name} ${data.surname || ''}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                <p><strong>Asunto:</strong> ${data.subject}</p>
                <p><strong>Mensaje:</strong></p>
                <p><i>"${data.message}"</i></p>
            `;
        }

        // 3. Enviar el correo
        await transporter.sendMail({
            from: `"Web Raíz Rentable" <${process.env.EMAIL_USER}>`,
            to: 'profesionalcharry@gmail.com',
            subject: subject,
            html: htmlContent,
            replyTo: data.email || undefined // Para responderle directamente si hay email
        });

        console.log('✅ Correo enviado correctamente a profesionalcharry@gmail.com');

        return NextResponse.json({
            success: true,
            message: 'Correo enviado correctamente'
        });
    } catch (error) {
        console.error('❌ Error al enviar correo:', error);
        return NextResponse.json(
            { success: false, message: 'Error al enviar el correo' },
            { status: 500 }
        );
    }
}
