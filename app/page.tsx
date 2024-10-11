"use client"

import Header from "@/components/Header"
import MessageContent from "@/components/MessageContent"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import TextInputField from "@/components/TextInputField"

export default function Home() {
  return (
    // <div className="flex items-center justify-center h-screen flex-col gap-4 ">
    //   Home
    //   {session?.user?.name && <h2>Hello {session?.user?.name}</h2>}
    //
    // </div>
    <Provider store={store}>
      <main className="flex flex-col h-screen font-sans w-screen px-4 pt-4">
        <Header />
        <div className="flex-grow overflow-hidden">
          <MessageContent />
        </div>
      </main>
    </Provider>
  )
}
