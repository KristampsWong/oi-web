'use client'

import { Edit } from 'react-feather'
import Logo from '@/components/Logo'
import { closeSidebar } from '@/store/chat-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'

type Conversation = {
  id: string
}
function ConversationHistory({
  conversationIds,
}: {
  conversationIds: Conversation[]
}) {
  const router = useRouter()
  return (
    <>
      {conversationIds.length === 0 ? (
        <div>
          <p className="text-zinc-500 text-sm">
            Your conversations with Ocean AI will appear here
          </p>
        </div>
      ) : (
        <>
          {conversationIds.map((conversation: Conversation) => (
            <button
              className="flex items-center p-2 hover:bg-gray-100 hover:rounded-lg w-full"
              key={conversation.id}
              onClick={() => {
                router.push(`/c/${conversation.id}`)
              }}
            >
              <span>{conversation.id}</span>
            </button>
          ))}
        </>
      )}
    </>
  )
}

export default function SidebarContent() {
  const loading = false
  const dispatch = useDispatch()
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.chat.chat.isSidebarCollapsed,
  )
  const router = useRouter()
  return (
    <div
      className={`${
        isSidebarCollapsed ? 'w-64 visible' : ' w-0 invisible'
      } z-[1] flex-shrink-0 overflow-x-hidden transition-all duration-300 border-r border-gray-200 absolute sm:relative h-full bg-white`}
    >
      <div className="flex flex-col px-4 w-64">
        <div className="text-gray-800 flex flex-col gap-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-2 justify-start">
              <Logo size={30} />
              <h1 className="text-2xl font-medium">Ocean AI</h1>
            </div>
            <button
              className="text-black/80 rounded-full border border-gray-200 h-8 w-8 flex items-center justify-center"
              onClick={() => dispatch(closeSidebar())}
            >
              <span className="text-lg">X</span>
            </button>
          </div>

          <button
            className="flex items-center gap-2 hover:bg-gray-100 hover:rounded-lg w-full p-2"
            onClick={() => router.push('/')}
          >
            <span className="flex items-center justify-center">
              <Edit size={22} />
            </span>
            <span>New conversation</span>
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">History</h2>
          {loading ? (
            <div className="flex h-1/3 items-center justify-center ">
              <div className="animate-spin">
                <Logo size={15} color="hsla(0,0%,90%,0.7)" />
              </div>
            </div>
          ) : (
            <ConversationHistory
              conversationIds={[{ id: 'daf' }, { id: 'fjkd' }]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
