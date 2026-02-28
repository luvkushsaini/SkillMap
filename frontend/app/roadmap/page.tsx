import Navbar from '@/components/Navbar';
import RoadmapCard from '@/components/RoadmapCard';

async function getRoadmaps() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/roadmaps`,
            { next: { revalidate: 3600 } }
        );
        return res.json();
    } catch {
        return [];
    }
}

export default async function RoadmapListPage() {
    const roadmaps = await getRoadmaps();
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-5xl mx-auto w-full px-4 py-12">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Learning Roadmaps</h1>
                <p className="text-gray-500 mb-8">Browse curated roadmaps or generate your own with AI</p>
                {roadmaps.length === 0 ? (
                    <p className="text-gray-400 text-center py-16">No roadmaps found. Make sure the backend is running.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmaps.map((roadmap: any) => (
                            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
