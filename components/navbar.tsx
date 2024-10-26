import React from 'react'
import { auth, signIn } from '@/auth'
import UserAvatar from '@/components/user-avatar'
import SidebarButton from './sidebar-button'

export default async function Header() {
  const session = await auth()
  return (
    <div className="flex justify-between w-full">
      <div className="text-lg font-semibold text-zinc-600 flex gap-4 items-center h-14">
        {session && <SidebarButton session={session} />}
        <h4>Chat with Pion</h4>
      </div>

      {session ? (
        <UserAvatar session={session} />
      ) : (
        <div className="flex gap-4 items-center sm:pr-2">
          <form
            action={async () => {
              'use server'

              await signIn('auth0')
            }}
          >
            <button
              className="bg-black text-white border border-gray-200 rounded-full text-sm px-4 py-1.5"
              type="submit"
            >
              Login
            </button>
          </form>
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
