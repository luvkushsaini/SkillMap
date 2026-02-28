'use client';

import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { setToken, saveUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) return;
        setLoading(true);
        setError('');
        try {
            const res = await authAPI.login({ email, password });
            setToken(res.data.token);
            saveUser(res.data.user);
            router.push('/dashboard');
        } catch {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome back</h1>
                <p className="text-gray-500 mb-8">Sign in to continue your learning journey</p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                    </div>
                    <button onClick={handleLogin} disabled={loading}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
                <p className="text-center text-gray-500 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-700 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
