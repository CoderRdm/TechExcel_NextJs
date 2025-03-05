// app/show/page.js
"use client"; // Client-side component
import { useAuth } from '@/context/AuthContext';
import {useTemplates } from '../hooks/useTemplates';
import { TemplateList } from '../components/TemplateList';
;

export default function TemplatesPage() {
  const { user } = useAuth();
  const { templates, loading, error } = useTemplates(user?.id);

  if (!user) {
    return <LoginForm />; // Show login form if not authenticated
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Templates</h1>
      <TemplateList templates={templates} />
    </div>
  );
}