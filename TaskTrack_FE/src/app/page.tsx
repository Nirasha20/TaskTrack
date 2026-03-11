'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    router.replace(isAuthenticated ? '/tasks' : '/login');
  }, [isAuthenticated, isInitialized, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-gray-400 text-sm">Redirecting...</div>
    </div>
  );
}

