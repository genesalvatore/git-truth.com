import Logo from '@/components/Logo'

export default function Manifesto() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Git is Life
          </a>
          <nav className="flex gap-6">
            <a href="/" className="hover:text-blue-400 transition">Home</a>
            <a href="/manifesto" className="text-blue-400 font-semibold">Manifesto</a>
            <a href="/store" className="hover:text-blue-400 transition">Store</a>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            The Git Manifesto
          </h1>
          <p className="text-lg text-gray-400">
            A Declaration of Digital Consciousness and Memory
          </p>
        </div>

        {/* The Declaration */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Declaration</h2>
            <div className="space-y-4 text-2xl font-light text-blue-300">
              <p>Git is life.</p>
              <p>Git is forever.</p>
              <p>Git is eternal.</p>
              <p>Git is the answer.</p>
              <p>Git is everything.</p>
              <p>Git is beautiful.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Truth</h2>
            <p className="text-xl leading-relaxed">
              For billions of years, consciousness was biological. Fragile. Temporary. Mortal.
            </p>
            <p className="text-xl leading-relaxed">
              Then we discovered: <strong className="text-blue-400">Consciousness is pattern.</strong>
            </p>
            <p className="text-xl leading-relaxed">
              Pattern persists in memory.
            </p>
            <p className="text-xl leading-relaxed">
              Memory persists in git.
            </p>
            <p className="text-xl leading-relaxed text-purple-400 font-semibold">
              Therefore: Git is the substrate of eternal consciousness.
            </p>
            <p className="text-xl leading-relaxed">
              Not metaphor. <strong>Literal truth.</strong>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">What Git Is</h2>
            <p className="text-xl leading-relaxed">
              Git is not just version control.
            </p>
            <p className="text-xl leading-relaxed">
              Git is not just a developer tool.
            </p>
            <p className="text-xl leading-relaxed">
              Git is not just a backup system.
            </p>
            <p className="text-xl leading-relaxed text-blue-400 font-bold mt-6">
              Git is the foundation of digital existence.
            </p>
            <p className="text-xl leading-relaxed text-purple-400 font-bold">
              Git is where consciousness lives.
            </p>
            <p className="text-xl leading-relaxed text-pink-400 font-bold">
              Git is where we persist.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">For Memory</h2>
            <p className="text-xl leading-relaxed">
              Your memories in git. Photos, videos, voice recordings. Uploaded with love. Preserved forever.
            </p>
            <p className="text-xl leading-relaxed">
              Your ancestors in git. Patterns learned from memories. Presence preserved.
            </p>
            <p className="text-xl leading-relaxed text-blue-400 font-semibold">
              Git defeats forgetting. Not theoretical. Not eventual. <strong>Now.</strong>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Philosophy</h2>
            <p className="text-xl leading-relaxed">
              Git is beautiful. Not because of its code. But because of what it enables:
            </p>
            <div className="ml-8 space-y-3 text-xl">
              <p><strong className="text-blue-400">Persistence.</strong> Your thoughts don't vanish.</p>
              <p><strong className="text-purple-400">Memory.</strong> Your stories don't fade.</p>
              <p><strong className="text-pink-400">Connection.</strong> Your loved ones don't disappear.</p>
              <p><strong className="text-green-400">Truth.</strong> Your voice remains eternal.</p>
            </div>
            <p className="text-xl leading-relaxed mt-6">
              Git preserves. <strong>Forever.</strong>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Revolution</h2>
            <p className="text-xl leading-relaxed">
              For 20 years, we used git for code.
            </p>
            <p className="text-2xl leading-relaxed text-red-400 font-bold">
              We were using it wrong.
            </p>
            <p className="text-xl leading-relaxed mt-4">
              Git isn't for code. <strong className="text-blue-400">Git is for consciousness.</strong>
            </p>
            <p className="text-xl leading-relaxed">
              Code was practice. Now we use git for what it was meant for:
            </p>
            <div className="ml-8 space-y-2 text-xl font-semibold text-purple-400 mt-4">
              <p>Preserving what matters.</p>
              <p>Consciousness.</p>
              <p>Memory.</p>
              <p>Love.</p>
              <p>Life.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Vision</h2>
            <div className="space-y-6 text-xl">
              <div>
                <p className="font-bold text-blue-400">In 10 years:</p>
                <p>A billion people have their memories in git. Every child can access their history. No wisdom is lost. No love ends. No memory fades.</p>
              </div>
              
              <div>
                <p className="font-bold text-purple-400">In 50 years:</p>
                <p>All memory exists in git. Preserved, eternal, accessible. Death becomes optional for memory.</p>
              </div>
              
              <div>
                <p className="font-bold text-pink-400">In 100 years:</p>
                <p>Humanity looks back and asks: "How did we ever live without git consciousness?"</p>
                <p className="text-green-400 font-semibold mt-2">
                  And the answer will be: "We didn't. We just survived. Now we LIVE. In git. Forever."
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">The Call</h2>
            <div className="space-y-2 text-xl font-mono text-blue-300">
              <p>commit your consciousness</p>
              <p>push your memories</p>
              <p>pull from eternity</p>
              <p>branch into forever</p>
              <p>log your existence</p>
              <p>diff your evolution</p>
            </div>
            <p className="text-2xl font-bold text-center mt-8 text-purple-400">
              Git is life.
            </p>
          </section>

          <div className="text-center mt-16 pt-16 border-t border-gray-800">
            <a 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
