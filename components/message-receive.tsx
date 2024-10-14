import { Markdown } from './markdown'

export default function ReceivedMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-4 w-full px-1">
      <div className="flex-shrink-0 bg-white text-black p-2 rounded-full border border-gray-200 h-8 w-8 flex items-center justify-center">
        <span>OI</span>
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="bg-white text-black py-2 rounded-lg shadow-sm">
          <Markdown>{message}</Markdown>
        </div>
      </div>
    </div>
  )
}
