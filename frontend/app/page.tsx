import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-5xl font-bold text-blue-900 mb-4">Map Your Learning Journey</h1>
                <p className="text-xl text-gray-500 mb-8 max-w-xl">
                    Enter any learning goal and get an AI-powered roadmap with milestones, resources, and progress tracking.
                </p>
                <div className="flex gap-4">
                    <Link href="/generate"
                        className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition">
                        Generate Roadmap
                    </Link>
                    <Link href="/roadmap"
                        className="border border-blue-700 text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
                        Browse Roadmaps
                    </Link>
                </div>
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
                    {[
                        { icon: '🤖', title: 'AI-Powered', desc: 'Gemini AI generates personalized roadmaps tailored to your goals' },
                        { icon: '📊', title: 'Track Progress', desc: 'Mark milestones complete and see your completion percentage' },
                        { icon: '🏆', title: 'Earn Badges', desc: 'Unlock achievement badges as you complete roadmap sections' },
                    ].map((f) => (
                        <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
