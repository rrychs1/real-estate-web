import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Log the data to the server console
        console.log('------------------------------------------------');
        console.log('📩 NUEVO MENSAJE DE CONTACTO RECIBIDO');
        console.log('------------------------------------------------');
        console.log('Fecha:', new Date().toLocaleString());
        console.log('Datos:', JSON.stringify(data, null, 2));
        console.log('------------------------------------------------');

        // Here you would typically integrate with SendGrid, Resend, plain SMTP, etc.
        // await sendEmail(data);

        return NextResponse.json({
            success: true,
            message: 'Mensaje recibido correctamente'
        });
    } catch (error) {
        console.error('Error al procesar formulario de contacto:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
