'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { LogOut } from 'react-feather'
import { useDispatch } from 'react-redux'
import { closeSidebar } from '@/store/chat-reducer'

export default function UserAvatar({ session }: { session: any }) {
  const { image, email } = session?.user ?? {}
  const dispatch = useDispatch()
  return (
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
        <DropdownMenuItem
          onClick={() => {
            signOut()
            dispatch(closeSidebar())
          }}
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
