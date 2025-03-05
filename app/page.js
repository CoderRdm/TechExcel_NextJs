// app/show/page.js
'use client'; // Required for client-side hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTemplates } from './hooks/useTemplates';
import { TemplateList } from './components/TemplateList';


export default function TemplatesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { templates, loading, error } = useTemplates(user?.id);
    useEffect(() => {
        if (!user) {
            router.push('/Login');
        }
    }, [user, router]);
    // if (!user) {
    //     return <LoginForm />; // Show login form if not authenticated
    // }

    // if (loading) return <div>Loading templates...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Templates</h1>
            <TemplateList templates={templates} />
        </div>
    );
}