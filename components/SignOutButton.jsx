"use client"
import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      type="button"
      className="px-3 py-2 bg-black text-white rounded-full text-sm hover:shadow-sm"
      onClick={() => signOut()}
    >
      <span>Sign Out</span>
    </button>
  )
}
