import type { Metadata } from 'next'
import './globals.css'
import ReduxProvider from '@/store/redux-provider'
import SidebarContent from '@/components/sidebar-content'

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
        <ReduxProvider>
          <main className="flex h-svh">
            <SidebarContent />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
