import React from 'react'
import { Edit, Sidebar } from 'react-feather'
import type { Message } from 'ai'

export default function Header({
  setMessages,
  isLogin,
  setIsLogin,
  isSidebar,
  setIsSidebar,
}: {
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  isSidebar: boolean
  setIsSidebar: (isSidebar: boolean) => void
}) {
  return (
    <div className="flex justify-between items-center w-full py-2 h-14">
      <div className="text-lg font-semibold text-zinc-600 flex gap-4 items-center">
        <div className={`${!isSidebar ? 'flex ' : 'hidden'}`}>
          {isLogin && (
            <button
              className="hover:bg-neutral-100 transition-colors duration-300 p-2 rounded-lg flex items-center justify-center "
              type="button"
              onClick={() => setIsSidebar(!isSidebar)}
            >
              <Sidebar size={23} />
            </button>
          )}
          <button
            className="hover:bg-neutral-100 transition-colors duration-300 p-2 rounded-lg flex items-center justify-center"
            type="button"
            onClick={() => setMessages([])}
          >
            <Edit size={22} />
          </button>
        </div>
        <h4 className="pl-4">Chat with Pion</h4>
      </div>

      <div className="flex gap-4 items-center">
        <button
          className="bg-black text-white border border-gray-200 rounded-full text-sm px-4 py-1.5"
          type="button"
          onClick={() => {
            setIsLogin(!isLogin)
            setIsSidebar(false)
          }}
        >
          {isLogin ? 'Logout' : 'Login'}
        </button>
        <a
          href="https://oceanai.so"
          className="bg-white text-black border border-gray-200 rounded-full text-sm px-4 py-1.5 hidden sm:block"
        >
          Learn More
        </a>
      </div>
    </div>
  )
}
