'use client'

import HomePage from '@/components/homepage'
import { useChat } from 'ai/react'
import MessageContent from '@/components/message-display'

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

  return (
    <>
      {messages.length === 0 ? (
        <HomePage
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
