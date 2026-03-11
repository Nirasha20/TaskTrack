'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link href="/tasks" className="text-lg font-bold text-blue-600 tracking-tight">
        TaskTrack
      </Link>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              user.role === 'ADMIN'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {user.role === 'ADMIN' ? 'Admin' : 'User'}
            </span>
          </>
        )}
        <button
          onClick={signOut}
          className="text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
