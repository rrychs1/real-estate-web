import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
    // Redirect /admin to /admin/login
    redirect('/admin/login');
}
