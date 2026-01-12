import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === validUser && password === validPass) {
        // Create a simple auth token (in production, use JWT or better)
        const authToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

        const cookieStore = await cookies();
        cookieStore.set('admin_auth', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Credenciales inválidas' }, { status: 401 });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
    return NextResponse.json({ success: true });
}
