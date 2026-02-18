export const CONFESSION_WALL_ADDRESS = {
  baseSepolia: '0x93a5346c0C7DC3F9fC49a9197FB0aB9e547460B4' as `0x${string}`,
  base: '0xd01526A5b52FbDC5d3f9fD2925fc57AA1604BBaa' as `0x${string}`,
} as const

export const CONFESSION_WALL_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "message", "type": "string"}],
    "name": "postConfession",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
    "name": "likeConfession",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getConfessions",
    "outputs": [{
      "components": [
        {"internalType": "uint256", "name": "id", "type": "uint256"},
        {"internalType": "string", "name": "message", "type": "string"},
        {"internalType": "uint256", "name": "likes", "type": "uint256"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
      ],
      "internalType": "struct ConfessionWall.Confession[]",
      "name": "",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "hasUserLiked",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getCooldownRemaining",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "message", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "ConfessionPosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "liker", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "newLikeCount", "type": "uint256"}
    ],
    "name": "ConfessionLiked",
    "type": "event"
  }
] as const

export const POSTING_FEE = '0.0001' // ETH
