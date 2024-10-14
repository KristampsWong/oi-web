import Header from '@/components/navbar'

import MultimodalInput from '@/components/multimodal-input'
import type { ChatRequestOptions, Message } from 'ai'

import { useScrollToBottom } from '@/components/use-scroll-to-bottom'
import MessageList from './message-list'

export default function MessageContent({
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
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()

  return (
    <main className="h-svh flex flex-col px-2">
      <Header setMessages={setMessages} />

      <div
        className="flex flex-col h-full items-center overflow-y-scroll"
        ref={messagesContainerRef}
      >
        <MessageList messages={messages} />

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
