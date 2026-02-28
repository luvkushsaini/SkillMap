'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { roadmapAPI, progressAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import MilestoneCard from '@/components/MilestoneCard';
import ProgressBar from '@/components/ProgressBar';
import { isLoggedIn } from '@/lib/auth';

export default function RoadmapPage() {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState<any>(null);
    const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await roadmapAPI.getById(Number(id));
                setRoadmap(res.data);
                if (isLoggedIn()) {
                    const progressRes = await progressAPI.get(Number(id));
                    const done = new Set<number>(
                        progressRes.data.filter((p: any) => p.completed).map((p: any) => p.milestone.id)
                    );
                    setCompletedIds(done);
                }
            } catch (err) {
                console.error('Failed to load roadmap', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleToggle = async (milestoneId: number, completed: boolean) => {
        if (!isLoggedIn()) return alert('Please login to track progress');
        try {
            await progressAPI.update(milestoneId, completed);
            setCompletedIds(prev => {
                const next = new Set(prev);
                if (completed) next.add(milestoneId); else next.delete(milestoneId);
                return next;
            });
        } catch {
            alert('Failed to update progress');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center text-gray-400">Loading roadmap...</div>
        </div>
    );

    if (!roadmap) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center text-gray-400">Roadmap not found</div>
        </div>
    );

    const total = roadmap.milestones?.length || 0;
    const completed = completedIds.size;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-3xl mx-auto w-full px-4 py-10">
                <h1 className="text-3xl font-bold text-blue-900">{roadmap.goal}</h1>
                <p className="text-gray-500 mt-2">{roadmap.description}</p>
                <ProgressBar total={total} completed={completed} />
                <div className="mt-6 space-y-4">
                    {roadmap.milestones?.map((m: any) => (
                        <MilestoneCard key={m.id} milestone={m}
                            completed={completedIds.has(m.id)} onToggle={handleToggle} />
                    ))}
                </div>
            </div>
        </div>
    );
}
