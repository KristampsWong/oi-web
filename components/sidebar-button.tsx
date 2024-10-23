'use client'

import React from 'react'
import { Sidebar, Edit } from 'react-feather'
import { openSidebar } from '@/store/chat-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'

export default function SidebarButton({ session }: { session: any }) {
  const dispatch = useDispatch()
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.chat.chat.isSidebarCollapsed,
  )
  const router = useRouter()
  return (
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
          router.push('/')
        }}
      >
        <Edit size={22} />
      </button>
    </div>
  )
}
