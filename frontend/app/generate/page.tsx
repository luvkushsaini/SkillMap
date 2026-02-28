'use client';

import { useState } from 'react';
import { roadmapAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const SUGGESTIONS = [
    'Become a Backend Developer', 'Learn Machine Learning',
    'Master React and Next.js', 'Become a DevOps Engineer',
    'Learn Cybersecurity', 'Become an Android Developer',
];

export default function GeneratePage() {
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleGenerate = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        setError('');
        try {
            const res = await roadmapAPI.generate(goal);
            router.push(`/roadmap/${res.data.id}`);
        } catch {
            setError('Generation failed. Make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <h1 className="text-4xl font-bold text-blue-900 mb-3 text-center">Generate Your Roadmap 🤖</h1>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    Enter a learning goal and Gemini AI will create a personalized roadmap with milestones and resources.
                </p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
                <div className="w-full max-w-xl">
                    <input
                        type="text" value={goal} onChange={e => setGoal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                        placeholder="e.g. Become a backend developer"
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={handleGenerate} disabled={loading || !goal.trim()}
                        className="mt-4 w-full bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50">
                        {loading ? '🤖 Generating your roadmap...' : '✨ Generate Roadmap'}
                    </button>
                </div>
                <div className="mt-12 w-full max-w-xl">
                    <p className="text-sm text-gray-400 mb-3 font-medium">Try these examples:</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map(s => (
                            <button key={s} onClick={() => setGoal(s)}
                                className="text-sm bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full hover:border-blue-400 hover:text-blue-700 transition">
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
