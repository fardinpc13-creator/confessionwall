import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Confession Wall | Base',
  description: 'Anonymous confessions on Base blockchain',
  keywords: ['base', 'blockchain', 'confessions', 'anonymous', 'web3'],
  openGraph: {
    title: 'Confession Wall',
    description: 'Share anonymous confessions on Base',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
