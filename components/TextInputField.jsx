"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "react-feather"
import { CreateChatSubmitHandler } from "@/lib/ChatHandler"

export default function TextInputField() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [inputMessage, setInputMessage] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputMessage])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
  const handleChatSubmit = CreateChatSubmitHandler()
  const handleSubmit = async () => {
    await handleChatSubmit(inputMessage)
    setInputMessage("")
    setIsDisabled(true)
  }
  return (
    <div className="mx-auto w-full items-center flex flex-col">
      <div
        className="flex items-center justify-between max-w-[48rem] w-full border border-gray-200 p-2 rounded-[2rem] h-full
      transition-colors duration-300 hover:bg-neutral-50 hover:shadow-sm overflow-hidden"
      >
        <div className="flex items-center pl-4 w-full h-full overflow-hidden">
          <textarea
            ref={textareaRef}
            placeholder="Enter text here"
            className="w-full focus:outline-none bg-transparent resize-none overflow-y-auto max-h-[25dvh]"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value)
              setIsDisabled(e.target.value.trim() === "")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            rows={1}
          />
        </div>
        <button
          className={`ml-2  text-white p-2 rounded-full self-end ${
            isDisabled ? "bg-zinc-200" : "bg-black"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </div>
  )
}
