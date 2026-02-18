# Confession Wall - Frontend App

Next.js frontend for the Confession Wall Base mini app.

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your contract addresses
```

## Configuration

Update `src/lib/contract.ts` with your deployed contract addresses:

```typescript
export const CONFESSION_WALL_ADDRESS = {
  baseSepolia: '0xYourSepoliaAddress',
  base: '0xYourMainnetAddress',
}
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or use the Vercel dashboard:
1. Import GitHub repository
2. Set environment variables
3. Deploy

### Netlify

```bash
npm run build
# Upload .next folder
```

## Environment Variables

Required:
- `NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA` - Contract address on Base Sepolia
- `NEXT_PUBLIC_CONTRACT_ADDRESS_BASE` - Contract address on Base Mainnet

Optional:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID

## Features

- 🦊 Coinbase Smart Wallet integration
- ⚡ Real-time updates via contract events
- 📱 Mobile-first responsive design
- 🌐 Base network support (Sepolia + Mainnet)
- 🎨 Dark theme with TailwindCSS
- ⏳ Cooldown timer display
- ✅ Transaction status feedback

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Wagmi v2
- Viem
- TailwindCSS
- React Query

## Testing

1. Connect Coinbase Wallet
2. Switch to Base Sepolia network
3. Post a test confession (0.0001 ETH)
4. Like confessions
5. Check cooldown timer

## Mobile Testing

Test on mobile devices or use browser dev tools:
- iPhone/Safari
- Android/Chrome
- Base App mobile view
