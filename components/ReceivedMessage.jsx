import Markdown from "react-markdown"

export default function ReceivedMessage({ message }) {
  return (
    <div className="flex items-start gap-4 w-full">
      <div className="flex-shrink-0 bg-white text-black p-2 rounded-full border border-gray-200 h-8 w-8 flex items-center justify-center">
        <span>OI</span>
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="bg-white text-black px-4 py-2 rounded-lg shadow-sm">
          <Markdown
            className="overflow-auto gap-4 flex flex-col"
            components={{
              pre: ({ ...props }) => (
                <pre
                  className="overflow-auto p-4 bg-gray-100 rounded-2xl "
                  {...props}
                />
              ),
              code: ({ ...props }) => (
                <code
                  className="bg-gray-100 rounded px-1 py-0.5 font-medium"
                  {...props}
                />
              ),
            }}
          >
            {message}
          </Markdown>
        </div>
      </div>
    </div>
  )
}
