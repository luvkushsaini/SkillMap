export default function ProgressBar({ total, completed }: { total: number; completed: number }) {
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return (
        <div className="my-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 font-medium">Progress</span>
                <span className="text-sm font-bold text-blue-700">{pct}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{completed} of {total} milestones completed</p>
        </div>
    );
}
