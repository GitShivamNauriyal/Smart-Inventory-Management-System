"use client";
export default function Home() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-950 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-400">
                    Welcome to Inventory Optimizer
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                    Go to your dashboard to get started.
                </p>
                <a
                    href="/dashboard"
                    className="inline-block mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                >
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
}
