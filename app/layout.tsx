import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
