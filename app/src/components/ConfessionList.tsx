'use client'

import { useReadContract, useChainId, useWatchContractEvent } from 'wagmi'
import { CONFESSION_WALL_ABI, CONFESSION_WALL_ADDRESS } from '@/lib/contract'
import { base } from 'wagmi/chains'
import ConfessionCard from './ConfessionCard'
import { useState } from 'react'

export default function ConfessionList() {
  const chainId = useChainId()
  const [refreshKey, setRefreshKey] = useState(0)

  const contractAddress = chainId === base.id 
    ? CONFESSION_WALL_ADDRESS.base 
    : CONFESSION_WALL_ADDRESS.baseSepolia

  const { data: confessions, isLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: CONFESSION_WALL_ABI,
    functionName: 'getConfessions',
    query: { 
      refetchInterval: 10000, // Poll every 10s
      enabled: !!contractAddress && contractAddress !== '0x'
    }
  })

  // Watch for new confessions
  useWatchContractEvent({
    address: contractAddress,
    abi: CONFESSION_WALL_ABI,
    eventName: 'ConfessionPosted',
    onLogs: () => {
      refetch()
      setRefreshKey(prev => prev + 1)
    }
  })

  // Watch for likes
  useWatchContractEvent({
    address: contractAddress,
    abi: CONFESSION_WALL_ABI,
    eventName: 'ConfessionLiked',
    onLogs: () => {
      refetch()
      setRefreshKey(prev => prev + 1)
    }
  })

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-400">Loading confessions...</p>
      </div>
    )
  }

  if (!confessions || confessions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-4xl mb-4">🤐</p>
        <p className="text-lg">No confessions yet</p>
        <p className="text-sm mt-2">Be the first to share something!</p>
      </div>
    )
  }

  // Show newest first
  const sortedConfessions = [...confessions].reverse()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Confessions</h2>
        <span className="text-sm text-gray-500">
          {confessions.length} confession{confessions.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-4">
        {sortedConfessions.map((confession) => (
          <ConfessionCard
            key={`${confession.id}-${refreshKey}`}
            id={confession.id}
            message={confession.message}
            likes={confession.likes}
            timestamp={confession.timestamp}
          />
        ))}
      </div>
    </div>
  )
}
