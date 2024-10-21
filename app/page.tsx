"use client"

import { useChat } from "ai/react"
import Header from "@/components/navbar"
import MultimodalInput from "@/components/multimodal-input"
import ItemSugesstion from "@/components/ItemSugesstion"
import {
  FileText,
  Edit3,
  Briefcase,
  Book,
  Map,
  Gift,
  Coffee,
} from "react-feather"
import { useScrollToBottom } from "@/components/use-scroll-to-bottom"
import Logo from "@/components/Logo"
import { motion } from "framer-motion"
import MessageList from "@/components/message-list"

const suggestions = [
  { icon: <FileText size={24} color="#e2c542" />, title: "Summarize text" },
  { icon: <Briefcase size={24} color="#6c71ff" />, title: "Make a plan" },
  { icon: <Edit3 size={24} color="#76d0eb" />, title: "Help me write" },
  { icon: <Book size={24} color="#ea8445" />, title: "Get an advice" },
  { icon: <Coffee size={24} color="#cb8bd0" />, title: "Tell me a joke" },
  { icon: <Gift size={24} color="#ea8445" />, title: "Suprise me" },
  { icon: <Map size={24} color="#76d0eb" />, title: "What's fun there" },
]

export default function Page() {
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
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <>
      <Header setMessages={setMessages} />

      {messages.length > 0 && (
        <div
          className="flex flex-col h-full items-center overflow-y-scroll w-full"
          ref={messagesContainerRef}
        >
          <MessageList messages={messages} isLoading={isLoading} />

          <div
            ref={messagesEndRef}
            className="flex-shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
      )}

      <div
        className={`${
          messages.length === 0
            ? "flex flex-col items-center justify-center h-full gap-5"
            : "mt-auto px-2 w-full"
        } `}
      >
        {messages.length === 0 && (
          <>
            <div className="hover:scale-110 transition-transform duration-200">
              <Logo size={60} />
            </div>
            <h2 className="text-2xl font-semibold">Hi, how can I help you?</h2>
          </>
        )}
        <MultimodalInput
          input={input}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          stop={stop}
        />
        {messages.length === 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 max-w-[48rem]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>
        )}
      </div>
      <span className="text-xs text-zinc-500 py-2 mx-auto text-center">
        Message are generated by AI and may be inaccurate or inappropriate.
      </span>
    </>
  )
}
