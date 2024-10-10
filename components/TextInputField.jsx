"use client"

import { useState } from "react"
import { ArrowUp } from "react-feather"
import { useDispatch } from "react-redux"
import { addMessage } from "@/store/conversationSlice"
export default function TextInputField() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [inputMessage, setInputMessage] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    dispatch(addMessage({ content: inputMessage, role: "user" }))
    setInputMessage("")

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: { content: inputMessage, role: "user" },
      }),
    })
    const data = await response.json()
    dispatch(
      addMessage({
        content: data.choices[0]?.message?.content,
        role: data.choices[0]?.message?.role,
      })
    )
    setIsDisabled(true)
  }
  return (
    <div className="mx-auto w-full items-center flex flex-col">
      <div
        className="flex items-center justify-between max-w-[48rem] w-full border border-gray-200 p-2 rounded-full 
      transition-colors duration-300 hover:bg-neutral-50 hover:shadow-sm"
      >
        <div className="flex items-center pl-4 w-full h-full">
          <input
            type="text"
            placeholder="Enter text here"
            className="w-full focus:outline-none bg-transparent h-full"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value)
              if (e.target.value.trim() !== "") {
                setIsDisabled(false)
              } else {
                setIsDisabled(true)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit()
              }
            }}
          />
        </div>
        <button
          className={`ml-2  text-white p-2 rounded-full ${
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
