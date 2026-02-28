'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUser, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        router.push('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-900">
                SkillMap 🗺️
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/roadmap" className="text-gray-600 hover:text-blue-700 font-medium">
                    Browse
                </Link>
                {user ? (
                    <>
                        <Link href="/generate" className="text-gray-600 hover:text-blue-700 font-medium">
                            Generate
                        </Link>
                        <Link href="/dashboard" className="text-gray-600 hover:text-blue-700 font-medium">
                            Dashboard
                        </Link>
                        <span className="text-gray-700 font-medium">👤 {user.name}</span>
                        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-600 hover:text-blue-700 font-medium">
                            Login
                        </Link>
                        <Link href="/register" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
