import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Check HTTP Basic Auth credentials
async function checkAuth() {
    const headersList = await headers();
    const authorization = headersList.get('authorization');

    if (!authorization) {
        return false;
    }

    try {
        const authValue = authorization.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        const validUser = process.env.ADMIN_USER || 'admin';
        const validPass = process.env.ADMIN_PASSWORD || 'admin123';

        return user === validUser && pwd === validPass;
    } catch {
        return false;
    }
}

// Unauthorized page component
function UnauthorizedPage() {
    return (
        <html>
            <head>
                <title>Auth Required</title>
            </head>
            <body style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'system-ui, sans-serif',
                backgroundColor: '#f5f5f5'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#333' }}>🔒 Autenticación Requerida</h1>
                    <p style={{ color: '#666' }}>Por favor ingresa tus credenciales para acceder al panel de administración.</p>
                    <p style={{ color: '#999', fontSize: '12px' }}>
                        Recarga la página para mostrar el diálogo de autenticación.
                    </p>
                </div>
            </body>
        </html>
    );
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        // Layouts can't return Response, so we render a page that tells the user to authenticate
        // The middleware should handle the 401 response, but as a fallback show this message
        return <UnauthorizedPage />;
    }

    return <>{children}</>;
}
