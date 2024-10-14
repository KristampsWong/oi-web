"use client"

import Logo from "@/components/Logo"
import Header from "@/components/navbar"
import {
  FileText,
  Edit3,
  Briefcase,
  Book,
  Map,
  Gift,
  Coffee,
} from "react-feather"
import MultimodalInput from "@/components/multimodal-input"
import SendMessage from "@/components/message-send"
import ReceivedMessage from "@/components/message-received"
import type { ChatRequestOptions, Message, CreateMessage } from "ai"
import { useChat } from "ai/react"
import { useScrollToBottom } from "@/components/use-scroll-to-bottom"

export default function HomePage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    stop,
    append,
  } = useChat()

  return (
    <>
      {messages.length === 0 ? (
        <Main
          input={input}
          handleInputChange={handleInputChange}
          setMessages={setMessages}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          append={append}
        />
      ) : (
        <MessageContent
          messages={messages}
          setMessages={setMessages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      )}
    </>
  )
}
const suggestions = [
  { icon: <FileText size={24} color="#e2c542" />, title: "Summarize text" },
  { icon: <Book size={24} color="#ea8445" />, title: "Get advice" },
  { icon: <Briefcase size={24} color="#6c71ff" />, title: "Make a plan" },
  { icon: <Edit3 size={24} color="#76d0eb" />, title: "Help me write" },
  { icon: <Coffee size={24} color="#cb8bd0" />, title: "Tell me a joke" },
  { icon: <Map size={24} color="#76d0eb" />, title: "What's fun there" },
  { icon: <Gift size={24} color="#ea8445" />, title: "Suprise me" },
]
function Main({
  input,
  isLoading,
  handleInputChange,
  setMessages,
  handleSubmit,
  append,
}: {
  input: string
  isLoading: boolean
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
  handleSubmit: (
    event?: {
      preventDefault?: () => void
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>
}) {
  return (
    <>
      <main className="min-h-svh flex flex-col items-center justify-center px-2">
        <Header setMessages={setMessages} />

        <div className="flex flex-col w-full flex-1 items-center justify-center gap-5 ">
          <div className="hover:scale-110 transition-transform duration-200">
            <Logo size={60} />
          </div>
          <h2 className="text-2xl font-semibold">Hi, how can I help you?</h2>
          <MultimodalInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="flex flex-wrap justify-center gap-2 max-w-[48rem]">
            {suggestions.map((suggestion, index) => (
              <ItemSugesstion
                key={index}
                title={suggestion.title}
                onClick={async () => {
                  await append({
                    content: suggestion.title,
                    role: "user",
                  })
                }}
              >
                {suggestion.icon}
              </ItemSugesstion>
            ))}
          </div>
        </div>

        <span className="text-xs text-zinc-500 py-2 mx-auto text-center">
          Message are generated by AI and may be inaccurate or inappropriate.
        </span>
      </main>
    </>
  )
}

function ItemSugesstion({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode
  title: string
  onClick: () => void
}) {
  return (
    <button
      className="flex rounded-full py-2 px-4 gap-2 hover:shadow-sm transition-colors duration-300
     hover:bg-zinc-50 items-center border border-gray-200 text-gray-600 text-sm
     w-[calc(50%-0.5rem)] sm:w-auto"
      onClick={onClick}
    >
      {children}
      <span>{title}</span>
    </button>
  )
}

function MessageContent({
  input,
  messages,
  isLoading,
  setMessages,
  handleInputChange,
  handleSubmit,
  stop,
}: {
  input: string
  isLoading: boolean
  messages: Message[]
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void

  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (
    event?: {
      preventDefault?: () => void
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void
  stop: () => void
}) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()

  return (
    <main className="h-svh flex flex-col px-2">
      <Header setMessages={setMessages} />

      {/* <div className="flex-grow overflow-y-auto px-2">
        <div className="mx-auto max-w-3xl w-full">
          <Message messages={messages} />
        </div>
      </div> */}
      <div
        className="flex flex-col h-full items-center overflow-y-scroll"
        ref={messagesContainerRef}
      >
        <Message messages={messages} />

        <div
          ref={messagesEndRef}
          className="flex-shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <div className="mt-auto px-2">
        <MultimodalInput
          input={input}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          stop={stop}
        />
      </div>
      <span className="text-xs text-zinc-500 py-2 mx-auto text-center">
        Message are generated by AI and may be inaccurate or inappropriate.
      </span>
    </main>
  )
}

function Message({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <article key={index} className="w-full max-w-3xl my-2">
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
