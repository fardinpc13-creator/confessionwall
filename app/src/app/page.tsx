'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import WalletConnect from '@/components/WalletConnect'
import PostConfession from '@/components/PostConfession'
import ConfessionList from '@/components/ConfessionList'

export default function Home() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isCorrectChain = chainId === base.id || chainId === baseSepolia.id

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">🤫 Confession Wall</h1>
          <p className="text-gray-400">Anonymous confessions on Base</p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect />
        </div>

        {/* Wrong Network Warning */}
        {isConnected && !isCorrectChain && (
          <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
            <p className="text-yellow-400 text-sm mb-2">Wrong network detected</p>
            <button
              onClick={() => switchChain({ chainId: base.id })}
              className="text-xs bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
            >
              Switch to Base
            </button>
          </div>
        )}

        {/* Post Section */}
        {isConnected && isCorrectChain && (
          <div className="mb-12">
            <PostConfession />
          </div>
        )}

        {/* Confessions List */}
        <ConfessionList />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Built on Base • Powered by Coinbase Smart Wallet</p>
      </footer>
    </main>
  )
}
