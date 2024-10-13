import React from "react"
import { Edit } from "react-feather"
// import SignOutButton from "../components/SignOutButton"
// import SigninButton from "@/components/SigninButton"
//import { session } from "next-auth/react"

export default function Header({ setMessages }) {

  return (
    <div className="flex justify-between items-center w-full py-2">
      <div className="text-lg font-semibold text-zinc-600 flex gap-4 items-center">
        <button
          className="hover:bg-neutral-100 transition-colors duration-300 p-2 rounded-lg flex items-center justify-center"
          type="button"
          onClick={() => setMessages([])}
        >
          <Edit size={22} />
        </button>
        <h4>Chat with Pion</h4>
      </div>

      <div className="flex gap-4 items-center">
        {/* <div>{session?.user ? <SignOutButton /> : <SigninButton />}</div> */}
        <a
          href="https://oceanai.so"
          className="bg-white text-black border border-gray-200 rounded-full text-sm px-3 py-2"
        >
          Learn More
        </a>
      </div>
    </div>
  )
}
