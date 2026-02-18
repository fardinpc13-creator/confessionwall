'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useAccount, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONFESSION_WALL_ABI, CONFESSION_WALL_ADDRESS, POSTING_FEE } from '@/lib/contract'
import { base } from 'wagmi/chains'

export default function PostConfession() {
  const [message, setMessage] = useState('')
  const chainId = useChainId()
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const contractAddress = chainId === base.id 
    ? CONFESSION_WALL_ADDRESS.base 
    : CONFESSION_WALL_ADDRESS.baseSepolia

  const { data: cooldownRemaining } = useReadContract({
    address: contractAddress,
    abi: CONFESSION_WALL_ABI,
    functionName: 'getCooldownRemaining',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 1000 }
  })

  const handlePost = () => {
    if (!message.trim() || message.length > 280) return
    writeContract({
      address: contractAddress,
      abi: CONFESSION_WALL_ABI,
      functionName: 'postConfession',
      args: [message],
      value: parseEther(POSTING_FEE),
    })
  }

  if (isSuccess && message) {
    setMessage('')
  }

  const isLoading = isPending || isConfirming
  const hasCooldown: boolean = Boolean(cooldownRemaining && Number(cooldownRemaining) > 0)
  const cooldownSeconds: number = cooldownRemaining ? Math.ceil(Number(cooldownRemaining)) : 0

  if (isConfirming) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-sm text-gray-400">Posting confession...</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-4">Post Anonymous Confession</h2>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Share your confession anonymously..."
        maxLength={280}
        className="w-full p-4 bg-black border border-gray-700 rounded-lg resize-none focus:outline-none focus:border-blue-500 mb-2 transition-colors"
        rows={4}
      />
      
      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm ${message.length > 260 ? 'text-yellow-400' : 'text-gray-400'}`}>
          {message.length}/280
        </span>
        <span className="text-sm text-gray-400">
          Fee: {POSTING_FEE} ETH
        </span>
      </div>

      {hasCooldown && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600 rounded-lg">
          <p className="text-blue-400 text-sm">
            ⏳ Cooldown: {cooldownSeconds} seconds remaining
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded-lg">
          <p className="text-red-400 text-sm">
            {error.message.includes('InsufficientFee') ? 'Insufficient ETH fee' :
             error.message.includes('CooldownActive') ? 'Please wait for cooldown' :
             error.message.includes('user rejected') ? 'Transaction rejected' :
             'Error posting confession'}
          </p>
        </div>
      )}

      {isSuccess && (
        <div className="mb-4 p-3 bg-green-900/20 border border-green-600 rounded-lg">
          <p className="text-green-400 text-sm">
            ✅ Confession posted successfully!
          </p>
        </div>
      )}

      <button
        onClick={handlePost}
        disabled={!message.trim() || message.length > 280 || isLoading || hasCooldown}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
      >
        {isLoading ? 'Posting...' : hasCooldown ? 'Cooldown Active' : 'Post Confession'}
      </button>
    </div>
  )
}
