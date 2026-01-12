import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const formData = await request.formData();
    const method = formData.get('_method');

    // Handle logout
    if (method === 'DELETE') {
        const cookieStore = await cookies();
        cookieStore.delete('admin_auth');
        return NextResponse.redirect(new URL('/zona-admin', request.url));
    }

    // Handle login
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === validUser && password === validPass) {
        // Create an auth token
        const authToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

        const cookieStore = await cookies();
        cookieStore.set('admin_auth', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        // Redirect to admin page
        return NextResponse.redirect(new URL('/zona-admin', request.url));
    }

    // Invalid credentials - redirect back with error (using query param)
    return NextResponse.redirect(new URL('/zona-admin?error=invalid', request.url));
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
    return NextResponse.json({ success: true });
}
