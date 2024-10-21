import type { Metadata } from "next"
import "./globals.css"
import ReduxProvider from "@/store/redux-provider"
import SidebarContent from "@/components/sidebar-content"
import { useMemo } from "react"

export const metadata: Metadata = {
  title: "Chat with Pion",
  description: "Pion is a chatbot that powered by Ocean AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebar = useMemo(() => {
    return <SidebarContent />
  }, [])

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <main className="flex h-svh">
            {sidebar}
            <div className="w-full flex flex-col items-center px-4 ">
              {children}
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
