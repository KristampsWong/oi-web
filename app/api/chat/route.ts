/* eslint-disable import/prefer-default-export, max-lines */

import { createOpenAI as createGroq } from '@ai-sdk/openai'
import { convertToCoreMessages, streamText } from 'ai'

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  if (!messages) {
    throw new Error('Message is required')
  }

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    messages: convertToCoreMessages(messages),
  })

  return result.toDataStreamResponse()
}
