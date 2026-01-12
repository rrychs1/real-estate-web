import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Check if user has valid auth cookie
async function isAuthenticated() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');
    return !!authCookie?.value;
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuth = await isAuthenticated();

    // Skip auth check for login page
    return <>{children}</>;
}

// Separate component for protected routes
export async function ProtectedAdminContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuth = await isAuthenticated();

    if (!isAuth) {
        redirect('/admin/login');
    }

    return <>{children}</>;
}
