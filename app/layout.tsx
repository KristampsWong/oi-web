import type { Metadata } from 'next'
import './globals.css'
import ReduxProvider from '@/store/redux-provider'
import SidebarContent from '@/components/sidebar-content'
import { SessionProvider } from 'next-auth/react'
import Header from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Chat with Pion',
  description: 'Pion is a chatbot that powered by Ocean AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ReduxProvider>
            <main className="flex h-svh">
              <SidebarContent />
              <div className="w-full flex flex-col items-center px-4 ">
                <Header />
                {children}
              </div>
            </main>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
