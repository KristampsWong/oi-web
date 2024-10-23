import React from 'react'
import { LogOut } from 'react-feather'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth } from '@/auth'
import SidebarButton from './sidebar-button'

export default async function Header() {
  const session = await auth()
  const { image, email } = session?.user ?? {}

  return (
    <div className="flex justify-between w-full">
      <div className="text-lg font-semibold text-zinc-600 flex gap-4 items-center h-14">
        {session && <SidebarButton session={session} />}
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
            <DropdownMenuItem asChild>
              <form
                action={async () => {
                  'use server'

                  await signOut()
                }}
              >
                <button type="submit">
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4 items-center sm:pr-2">
          <button
            className="bg-black text-white border border-gray-200 rounded-full text-sm px-4 py-1.5"
            type="button"
            onClick={() => signIn()}
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
