"use client";

import { useRef, useEffect } from "react";
import { ArrowUp } from "react-feather";

export default function TextInputField({
  input,
  handleInputChange,
  handleSubmit,
}) {
  const isDisabled = false;
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

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
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
            onChange={handleInputChange}
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
  );
}
