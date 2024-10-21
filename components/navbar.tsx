'use client'

import React from 'react'
import { Edit, Sidebar, LogOut } from 'react-feather'
import type { Message } from 'ai'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { openSidebar, closeSidebar } from '@/store/chat-reducer'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header({
  setMessages,
}: {
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
}) {
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.chat.chat.isSidebarCollapsed,
  )
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()
  const { image, email } = session?.user ?? {}

  return (
    <div className="flex justify-between items-center w-full h-14">
      <div className="text-lg font-semibold text-zinc-600 flex gap-4 items-center ">
        <div className={`${!isSidebarCollapsed ? 'flex' : 'hidden'}`}>
          {session && (
            <button
              className="hover:bg-neutral-100 transition-colors duration-300 p-2 rounded-lg flex items-center justify-center "
              type="button"
              onClick={() => {
                dispatch(openSidebar())
              }}
            >
              <Sidebar size={23} />
            </button>
          )}
          <button
            className="hover:bg-neutral-100 transition-colors duration-300 p-2 rounded-lg flex items-center justify-center"
            type="button"
            onClick={() => {
              setMessages([])
              router.push('/')
            }}
          >
            <Edit size={22} />
          </button>
        </div>
        <h4>Chat with Pion</h4>
      </div>

      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button type="button">
              <Image
                src={image ?? '/default-avatar.png'}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 p-2 rounded-2xl w-64">
            <DropdownMenuLabel className="text-neutral-400 font-medium ">
              {email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut size={16} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4 items-center sm:pr-2">
          <button
            className="bg-black text-white border border-gray-200 rounded-full text-sm px-4 py-1.5"
            type="button"
            onClick={() => {
              signIn()
              dispatch(closeSidebar())
            }}
          >
            Login
          </button>
          <a
            href="https://oceanai.so"
            className="bg-white text-black border border-gray-200 rounded-full text-sm px-4 py-1.5 hidden sm:block"
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  )
}
