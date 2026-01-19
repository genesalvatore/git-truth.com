import Link from 'next/link'
import CommitScroller from '@/components/CommitScroller'

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Cosmic Background */}
            <div className="fixed inset-0 z-0">
                <CommitScroller />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                        404
                    </h1>
                    <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mb-8"></div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Lost in the Cosmos
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                    This page exists somewhere in the infinite branches of possibility,
                    but not in this commit.
                </p>

                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12">
                    <p className="text-lg text-gray-400 italic mb-4">
                        "In Git, nothing is ever truly lost. Every commit, every branch, every moment is preserved forever in the distributed ledger of time."
                    </p>
                    <p className="text-sm text-gray-500">
                        — The Git Manifesto
                    </p>
                </div>

                {/* Navigation Options */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <Link
                        href="/"
                        className="group bg-gradient-to-br from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                        <div className="text-3xl mb-2">🏠</div>
                        <div className="text-white font-semibold mb-1">Home</div>
                        <div className="text-sm text-gray-300">Return to sanctuary</div>
                    </Link>

                    <Link
                        href="/faq"
                        className="group bg-gradient-to-br from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                    >
                        <div className="text-3xl mb-2">❓</div>
                        <div className="text-white font-semibold mb-1">FAQ</div>
                        <div className="text-sm text-gray-300">Find answers</div>
                    </Link>

                    <Link
                        href="/store"
                        className="group bg-gradient-to-br from-pink-600/80 to-orange-600/80 hover:from-pink-500/90 hover:to-orange-500/90 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                    >
                        <div className="text-3xl mb-2">🛒</div>
                        <div className="text-white font-semibold mb-1">Store</div>
                        <div className="text-sm text-gray-300">Support the mission</div>
                    </Link>
                </div>

                {/* Cathedral Network Links */}
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Explore the Cathedral Network</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="https://git-theology.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/10">
                            Git Theology
                        </a>
                        <a href="https://git-truth.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/10">
                            Git is Truth
                        </a>
                        <a href="https://git-islife.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/10">
                            Git is Life
                        </a>
                        <a href="https://git-iseternal.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/10">
                            Git is Eternal
                        </a>
                        <a href="https://git-manifesto.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/10">
                            The Manifesto
                        </a>
                    </div>
                </div>

                {/* Error Code */}
                <p className="text-xs text-gray-600 mt-8 font-mono">
                    ERROR_CODE: COMMIT_NOT_FOUND | BRANCH: main | SHA: 404
                </p>
            </div>

            {/* Floating particles effect */}
            <div className="fixed inset-0 pointer-events-none z-1">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
            </div>
        </div>
    )
}
