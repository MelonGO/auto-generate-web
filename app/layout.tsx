import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { TailwindIndicator } from '@/app/components/tailwind-indicator'
import { Providers } from '@/app/components/providers'
import { Analytics } from "@vercel/analytics/react"

import '@/app/globals.css'
import clsx from 'clsx'

export const metadata = {
  title: {
    default: 'Auto Generate Web',
    template: `%s - Auto Generate Web`
  },
  description: 'An auto generate web built using Next.js 14 server components.',
  icons: {
    icon: '/favicon.ico',
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(
        'font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable
      )}>
        <Toaster />
        <Providers>
          {children}
          <TailwindIndicator />
          <Analytics />
        </Providers>
        {/* <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <aside>
            <p>Copyright © 2024 - MelonCoding</p>
          </aside>
        </footer> */}
      </body>
    </html>
  );
}
