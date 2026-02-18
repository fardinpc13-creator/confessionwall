'use client'

import { useAccount, useWriteContract, useChainId, useReadContract } from 'wagmi'
import { CONFESSION_WALL_ABI, CONFESSION_WALL_ADDRESS } from '@/lib/contract'
import { base } from 'wagmi/chains'

type ConfessionProps = {
  id: bigint
  message: string
  likes: bigint
  timestamp: bigint
}

export default function ConfessionCard({ id, message, likes, timestamp }: ConfessionProps) {
  const { address } = useAccount()
  const chainId = useChainId()
  const { writeContract, isPending } = useWriteContract()
  
  const contractAddress = chainId === base.id 
    ? CONFESSION_WALL_ADDRESS.base 
    : CONFESSION_WALL_ADDRESS.baseSepolia

  const { data: hasLiked } = useReadContract({
    address: contractAddress,
    abi: CONFESSION_WALL_ABI,
    functionName: 'hasUserLiked',
    args: address ? [id, address] : undefined,
    query: { enabled: !!address }
  })

  const handleLike = () => {
    if (!address || hasLiked) return

    writeContract({
      address: contractAddress,
      abi: CONFESSION_WALL_ABI,
      functionName: 'likeConfession',
      args: [id],
    })
  }

  const timeAgo = (timestamp: bigint) => {
    const now = Math.floor(Date.now() / 1000)
    const diff = now - Number(timestamp)
    
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all">
      <p className="text-gray-100 mb-4 leading-relaxed whitespace-pre-wrap break-words">
        {message}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {timeAgo(timestamp)}
        </span>
        
        <button
          onClick={handleLike}
          disabled={!address || hasLiked || isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
          title={hasLiked ? 'Already liked' : 'Like this confession'}
        >
          <span className={`text-lg ${hasLiked ? 'text-red-500' : 'text-gray-400'}`}>
            {hasLiked ? '❤️' : '🤍'}
          </span>
          <span className="text-sm font-semibold">{likes.toString()}</span>
        </button>
      </div>
    </div>
  )
}
