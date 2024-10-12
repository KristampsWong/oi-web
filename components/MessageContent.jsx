"use client"

import TextInputField from "@/components/TextInputField"
import Logo from "@/components/Logo"
import {
  FileText,
  Edit3,
  Briefcase,
  Book,
  Map,
  Gift,
  Coffee,
} from "react-feather"
import SendMessage from "@/components/SendMessage"
import ReceivedMessage from "@/components/ReceivedMessage"
import { useSelector } from "react-redux"
import { CreateChatSubmitHandler } from "@/lib/ChatHandler"
export default function MessageContent() {
  const messageList = useSelector((state) => state.conversation.messageList)

  return (
    <div className="flex flex-col h-full w-full">
      {messageList.length === 0 ? (
        <FallBack />
      ) : (
        <>
          <div className="flex-grow overflow-auto">
            <div className="mx-auto max-w-3xl w-full">
              <Message messageList={messageList} />
            </div>
          </div>
          <div className="mt-auto">
            <TextInputField />
          </div>
        </>
      )}
    </div>
  )
}

function Message({ messageList }) {
  return (
    <>
      {messageList.map((message, index) => (
        <article key={index} className="my-5 w-full">
          {message.role === "user" ? (
            <SendMessage message={message.content} />
          ) : (
            <ReceivedMessage message={message.content} />
          )}
        </article>
      ))}
    </>
  )
}

function FallBack() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-5 ">
      <div className="hover:scale-110 transition-transform duration-200">
        <Logo size={60} />
      </div>
      <h2 className="text-2xl font-semibold">Hi, how can I help you?</h2>
      <TextInputField />
      <div className="flex flex-wrap justify-center gap-2 max-w-[48rem]">
        <ItemSugesstion title="Summarize text">
          <FileText size={24} color="#e2c542" />
        </ItemSugesstion>
        <ItemSugesstion title="Get advice">
          <Book size={24} color="#ea8445" />
        </ItemSugesstion>
        <ItemSugesstion title="Make a plan">
          <Briefcase size={24} color="#6c71ff" />
        </ItemSugesstion>
        <ItemSugesstion title="Help me write">
          <Edit3 size={24} color="#76d0eb" />
        </ItemSugesstion>
        <ItemSugesstion title="Tell me a joke">
          <Coffee size={24} color="#cb8bd0" />
        </ItemSugesstion>
        <ItemSugesstion title="What's fun there">
          <Map size={24} color="#76d0eb" />
        </ItemSugesstion>
        <ItemSugesstion title="Suprise me">
          <Gift size={24} color="#ea8445" />
        </ItemSugesstion>
      </div>
    </div>
  )
}

function ItemSugesstion({ children, title }) {
  const handleChatSubmit = CreateChatSubmitHandler()
  const handleSubmit = async () => {
    await handleChatSubmit(title)
  }

  return (
    <button
      className="flex  rounded-full py-2 px-4 gap-2 hover:shadow-sm transition-colors duration-300
     hover:bg-zinc-50 items-center border border-gray-200 text-gray-600 text-sm"
      onClick={handleSubmit}
    >
      {children}
      <span>{title}</span>
    </button>
  )
}
