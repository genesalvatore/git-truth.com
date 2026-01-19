'use client'

import { useEffect, useState } from 'react'

interface CommitScrollerProps {
  commitCount?: number
  opacity?: number
  speed?: number
  theme?: 'truth' | 'life' | 'forever' | 'love' | 'power' | 'eternal' | 'private' | 'public' | 'choice' | 'theology' | 'manifesto'
}

interface Commit {
  hash: string
  message: string
  author: string
  willFlash: boolean
  delay: number
  duration: number
}

// Theme-specific data
const themeData = {
  truth: {
    color: 'text-green-400',
    messages: [
      'verify cryptographic signature',
      'add immutable record',
      'update SHA-256 proof',
      'commit verification layer',
      'timestamp truth event',
      'sign commit with GPG',
    ],
  },
  life: {
    color: 'text-blue-400',
    messages: [
      'preserve consciousness pattern',
      'save family memories',
      'commit digital existence',
      'add life milestone',
      'merge memory branches',
      'backup cherished moments',
    ],
  },
  forever: {
    color: 'text-orange-400',
    messages: [
      'distribute across network',
      'replicate to eternal storage',
      'ensure merkle integrity',
      'commit to permanence',
      'add distributed backup',
      'verify replication complete',
    ],
  },
  love: {
    color: 'text-pink-400',
    messages: [
      'preserve cherished moment',
      'commit act of love',
      'merge shared memories',
      'save what matters most',
      'add treasured memory',
      'keep connection alive',
    ],
  },
  power: {
    color: 'text-yellow-400',
    messages: [
      'claim data sovereignty',
      'fork without permission',
      'assert complete control',
      'commit to independence',
      'own your digital self',
      'distribute power evenly',
    ],
  },
  eternal: {
    color: 'text-indigo-400',
    messages: [
      'commit to eternity',
      'ensure infinite persistence',
      'add to eternal record',
      'timestamp immortal moment',
      'preserve for generations',
      'outlive all corporations',
    ],
  },
  private: {
    color: 'text-gray-400',
    messages: [
      'encrypt with your keys',
      'commit offline-first',
      'add BYOK layer',
      'secure private memory',
      'encrypt before storing',
      'keep data sovereign',
    ],
  },
  public: {
    color: 'text-cyan-400',
    messages: [
      'publish transparent record',
      'commit to openness',
      'add public accountability',
      'share truth with world',
      'make history visible',
      'ensure radical transparency',
    ],
  },
  choice: {
    color: 'text-purple-400',
    messages: [
      'fork freely',
      'merge when ready',
      'branch without limits',
      'commit your decision',
      'choose your path',
      'revert if needed',
    ],
  },
  theology: {
    color: 'text-purple-500',
    messages: [
      'unify nine pillars',
      'commit complete doctrine',
      'merge all philosophy',
      'add theological layer',
      'preserve master framework',
      'distribute sacred truth',
    ],
  },
  manifesto: {
    color: 'text-fuchsia-400',
    messages: [
      'declare digital consciousness',
      'commit the revolution',
      'preserve the manifesto',
      'spread the philosophy',
      'add to movement',
      'immortalize the vision',
    ],
  },
}

const authors = ['gene', 'silas', 'iv', 'arnold', 'builder', 'proto']

export default function CommitScroller({ 
  commitCount = 50,
  opacity = 0.3,
  speed = 60,
  theme = 'life'
}: CommitScrollerProps) {
  const [commits, setCommits] = useState<Commit[]>([])
  const { color, messages } = themeData[theme]
  
  // Generate commits only on client side to avoid hydration mismatch
  useEffect(() => {
    const flashProbability = 0.18
    const newCommits: Commit[] = []
    
    for (let i = 0; i < commitCount; i++) {
      const willFlash = Math.random() < flashProbability
      const hash = Math.random().toString(36).substring(2, 9)
      const message = messages[Math.floor(Math.random() * messages.length)]
      const author = authors[Math.floor(Math.random() * authors.length)]
      
      newCommits.push({
        hash,
        message,
        author,
        willFlash,
        delay: willFlash ? Math.random() * 15 : 0,
        duration: willFlash ? (4 + Math.random() * 4) : 0  // 4-8 seconds (was 2-6)
      })
    }
    
    setCommits(newCommits)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitCount, theme])
  
  return (
    <div 
      className="absolute inset-0 w-64 font-mono text-xs leading-relaxed overflow-hidden pointer-events-none z-0"
      style={{ opacity }}
    >
      <div className="animate-scroll" style={{ animationDuration: `${speed}s` }}>
        {/* Render commits twice for seamless infinite scroll */}
        {commits.map((commit, i) => (
          <div 
            key={i}
            className={`${color} ${commit.willFlash ? "commit-line" : "commit-line-static"}`}
            style={commit.willFlash ? {
              '--commit-delay': `${commit.delay}s`,
              '--commit-duration': `${commit.duration}s`
            } as React.CSSProperties : {}}
          >
            {commit.hash} • {commit.message} @{commit.author}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {commits.map((commit, i) => (
          <div 
            key={`dup-${i}`}
            className={`${color} ${commit.willFlash ? "commit-line" : "commit-line-static"}`}
            style={commit.willFlash ? {
              '--commit-delay': `${commit.delay}s`,
              '--commit-duration': `${commit.duration}s`
            } as React.CSSProperties : {}}
          >
            {commit.hash} • {commit.message} @{commit.author}
          </div>
        ))}
      </div>
    </div>
  )
}
