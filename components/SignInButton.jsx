'use client'

import { signIn } from "@/auth"

export default function SigninButton() {
  return (
    <button
      type="submit"
      className="px-3 py-2 bg-black text-white rounded-full text-sm hover:shadow-sm"
      onClick={() => signIn("auth0")}
    >
      Sign In
    </button>
  )
}
