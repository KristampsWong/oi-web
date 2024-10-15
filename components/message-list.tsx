import type { Message } from 'ai'
import { Markdown } from '@/components/markdown'

export function SentMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end ">
      <div className="bg-gray-100 text-black px-5 rounded-[2rem] max-w-[70%] overflow-auto">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  )
}

export function ReceivedMessage({
  message,
  isLoading,
}: {
  message: string
  isLoading: boolean
}) {
  return (
    <div className="flex items-start gap-4 w-full px-1">
      <div className="flex-shrink-0 bg-white text-black p-2 rounded-full border border-gray-200 h-8 w-8 flex items-center justify-center">
        <span>OI</span>
      </div>
      <div className="flex-grow overflow-hidden ">
        <Markdown>{message}</Markdown>
        {isLoading && (
          <div className="h-4 w-4 rounded-full bg-black opacity-100 animate-pulse" />
        )}
      </div>
    </div>
  )
}

export default function MessageList({
  messages,
  isLoading,
}: {
  messages: Array<Message>
  isLoading: boolean
}) {
  return (
    <>
      {messages.map((message, index) => (
        <article key={index} className="w-full max-w-3xl my-4">
          {message.role === 'user' ? (
            <SentMessage message={message.content} />
          ) : (
            <ReceivedMessage message={message.content} isLoading={isLoading} />
          )}
        </article>
      ))}
    </>
  )
}
