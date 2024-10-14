import type { Message } from 'ai'
import SendMessage from '@/components/message-send'
import ReceivedMessage from '@/components/message-receive'

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <article key={index} className="w-full max-w-3xl my-2">
          {message.role === 'user' ? (
            <SendMessage message={message.content} />
          ) : (
            <ReceivedMessage message={message.content} />
          )}
        </article>
      ))}
    </>
  )
}
