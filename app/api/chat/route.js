import Groq from "groq-sdk"
import { NextResponse } from "next/server"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req, res) {
  try {
    const { message } = await req.json()
 
    if (!message) {
      throw new Error("Message is required")
    }
    const response = await groq.chat.completions.create({
      messages: message,
      model: "llama-3.1-8b-instant",
    })
   // console.log(message)
    return NextResponse.json(response)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
