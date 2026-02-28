'use client';

interface Milestone {
    id: number;
    title: string;
    description: string;
    resourceUrl: string;
    orderIndex: number;
}

interface Props {
    milestone: Milestone;
    completed?: boolean;
    onToggle?: (id: number, completed: boolean) => void;
}

export default function MilestoneCard({ milestone, completed = false, onToggle }: Props) {
    return (
        <div className={`bg-white rounded-xl p-5 border shadow-sm ${completed ? 'border-green-300 bg-green-50' : 'border-gray-100'}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggle?.(milestone.id, !completed)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition
            ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-400'}`}
                >
                    {completed && '✓'}
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 font-medium">Step {milestone.orderIndex}</span>
                        {completed && <span className="text-xs text-green-600 font-semibold">✅ Completed</span>}
                    </div>
                    <h4 className={`font-semibold text-gray-800 mb-1 ${completed ? 'line-through text-gray-400' : ''}`}>
                        {milestone.title}
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">{milestone.description}</p>
                    {milestone.resourceUrl && (
                        <a href={milestone.resourceUrl} target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline">
                            📚 Learn More →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
