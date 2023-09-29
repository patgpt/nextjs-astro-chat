import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { Header } from '@/components/header'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
export const metadata: Metadata = {
  
    metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Astrobot AI Chatbot`',
    template: `%s - Astrobot AI Chatbot`
  },
  description: 'Astrobot was built with Next.js and Vercel.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    
    images: '@/public/ava.jpeg',
    type: 'website',  
    locale: 'en_US',
    url: new URL('http://localhost:3000'),
    siteName: 'Astrobot AI Chatbot',
    title: 'Astrobot AI Chatbot',
    description: 'Astrobot AI Chatbot',

  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
         'bg-cover bg-fixed bg-no-repeat',
          
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            <Header />
            <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
