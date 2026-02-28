import Link from 'next/link';

interface Roadmap {
    id: number;
    goal: string;
    description: string;
    milestones: Array<{ id: number }>;
}

export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
    return (
        <Link href={`/roadmap/${roadmap.id}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition cursor-pointer">
                <h3 className="text-lg font-bold text-blue-900 mb-2">{roadmap.goal}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{roadmap.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{roadmap.milestones?.length || 0} milestones</span>
                    <span className="text-blue-600 text-sm font-medium">View →</span>
                </div>
            </div>
        </Link>
    );
}
