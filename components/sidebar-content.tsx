import { Edit, Sidebar } from "react-feather"
import Logo from "@/components/Logo"
import type { Message } from "ai"

export default function SidebarContent({
  isSidebar,
  setIsSidebar,
  setMessages,
}: {
  isSidebar: boolean
  setIsSidebar: (isSidebar: boolean) => void
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
}) {
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
            onClick={() => setIsSidebar(false)}
          >
            <span className="text-lg">X</span>
          </button>
        </div>

        <button className="flex items-center gap-2 hover:bg-gray-100 hover:rounded-lg w-full p-2"
          onClick={() => setMessages([])}>
          <span className="flex items-center justify-center">
            <Edit size={22} />
          </span>
          <span>New conversation</span>
        </button>
      </div>
    </div>
  )
}
