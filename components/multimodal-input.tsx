'use client'

import { auth } from '@/auth'
import type { ChatRequestOptions } from 'ai'
import { useRef, useEffect } from 'react'
import { ArrowUp } from 'react-feather'

export default function MultimodalInput({
  input,
  isLoading,
  stop = () => {},
  handleInputChange,
  handleSubmit,
}: {
  input: string
  isLoading: boolean
  stop?: () => void
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
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
  useEffect(() => {
    adjustTextareaHeight()
  }, [input])
  const token = 'eybdd'
  return (
    <div className="mx-auto w-full items-center flex flex-col">
      <div
        className="flex items-center justify-between max-w-2xl w-full border border-gray-200 p-2 rounded-[2rem] h-full
      transition-colors duration-300 hover:bg-neutral-50 hover:shadow-sm overflow-hidden"
      >
        <div className="flex items-center pl-4 flex-1 h-full overflow-hidden">
          <textarea
            ref={textareaRef}
            placeholder="Enter text here"
            className="w-full focus:outline-none bg-transparent resize-none overflow-y-auto max-h-[25dvh]"
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            rows={1}
            onChange={handleInputChange}
          />
        </div>

        {isLoading ? (
          <button
            className="rounded-full text-white bg-black flex w-8 h-8 items-center justify-center"
            onClick={(event) => {
              event.preventDefault()
              stop()
            }}
          >
            <div
              className="bg-white rounded-sm"
              style={{ width: 14, height: 14 }}
            />
          </button>
        ) : (
          <button
            className={`text-white rounded-full flex items-center justify-center h-8 w-8 self-end 
            ${input.length === 0 ? 'bg-zinc-200' : 'bg-black'}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
