/* eslint-disable import/prefer-default-export, max-lines */

import { createOpenAI as createGroq } from "@ai-sdk/openai"
import { convertToCoreMessages, streamText } from "ai"
import { saveChat } from "@/lib/queries"
import { getToken } from "next-auth/jwt";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()
  const authorization = req.headers.get("Authorization")
  // const token = await getToken({ req })
  // console.log(token)
  if (!authorization) {
    throw new Error("Authorization is required")
  }
  const coreMessages = convertToCoreMessages(messages)

  if (!messages) {
    throw new Error("Message is required")
  }

  const result = await streamText({
    model: groq("llama-3.1-8b-instant"),
    messages: coreMessages,
    onFinish: async ({ responseMessages }) => {
      try {
        await saveChat({
          messages: [...coreMessages, ...responseMessages],
          authorization,
        })
      } catch (error) {
        console.error("Failed to save chat")
      }
    },
  })

  return result.toDataStreamResponse()
}
