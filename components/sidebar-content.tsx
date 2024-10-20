import { Edit } from 'react-feather'
import Logo from '@/components/Logo'
import type { Message } from 'ai'
import { closeSidebar } from '@/store/chat-reducer'
import { useDispatch } from 'react-redux'

type Conversation = {
  _id: string
}
function ConversationHistory({
  conversationIds,
}: {
  conversationIds: Conversation[]
}) {
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
            <a
              href={`/c/${conversation._id}`}
              className="flex items-center p-2 hover:bg-gray-100 hover:rounded-lg w-full"
              key={conversation._id}
            >
              <span>{conversation._id}</span>
            </a>
          ))}
        </>
      )}
    </>
  )
}

export default function SidebarContent({
  setMessages,
}: {
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
}) {
  const loading = false
  const dispatch = useDispatch()
  return (
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

        <a
          className="flex items-center gap-2 hover:bg-gray-100 hover:rounded-lg w-full p-2"
          href="/"
        >
          <span className="flex items-center justify-center">
            <Edit size={22} />
          </span>
          <span>New conversation</span>
        </a>
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
          <ConversationHistory conversationIds={[{ _id: 'daf' }]} />
        )}
      </div>
    </div>
  )
}
