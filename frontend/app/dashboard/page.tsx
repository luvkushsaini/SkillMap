'use client';

import { useEffect, useState } from 'react';
import { progressAPI, roadmapAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';

export default function DashboardPage() {
    const [summary, setSummary] = useState<any[]>([]);
    const [myRoadmaps, setMyRoadmaps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [summaryRes, myRes] = await Promise.all([
                    progressAPI.summary(),
                    roadmapAPI.getMy(),
                ]);
                setSummary(summaryRes.data);
                setMyRoadmaps(myRes.data);
            } catch {
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center text-gray-400">Loading dashboard...</div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-4xl mx-auto w-full px-4 py-10">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">My Dashboard</h1>
                <p className="text-gray-500 mb-8">Track your progress across all learning roadmaps</p>

                <div className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Progress Overview</h2>
                    {summary.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                            <p className="text-gray-400 mb-4">No progress yet. Start a roadmap!</p>
                            <Link href="/roadmap" className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
                                Browse Roadmaps
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {summary.map((item: any) => (
                                <div key={item.roadmapId} className="bg-white rounded-xl p-5 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={`/roadmap/${item.roadmapId}`}
                                            className="text-lg font-semibold text-blue-900 hover:underline">
                                            {item.goal}
                                        </Link>
                                        <span className="text-sm text-gray-400">{item.completionPercentage}%</span>
                                    </div>
                                    <ProgressBar total={item.totalMilestones} completed={item.completedMilestones} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">🗺️ My Generated Roadmaps</h2>
                        <Link href="/generate" className="text-blue-700 text-sm font-medium hover:underline">+ Generate New</Link>
                    </div>
                    {myRoadmaps.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                            <p className="text-gray-400 mb-4">You haven&apos;t generated any roadmaps yet.</p>
                            <Link href="/generate" className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
                                Generate with AI
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {myRoadmaps.map((r: any) => (
                                <Link key={r.id} href={`/roadmap/${r.id}`}>
                                    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-300 transition cursor-pointer">
                                        <h3 className="font-semibold text-gray-800">{r.goal}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{r.milestones?.length || 0} milestones</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
