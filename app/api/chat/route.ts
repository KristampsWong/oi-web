/* eslint-disable import/prefer-default-export, max-lines */

import { createOpenAI as createGroq } from '@ai-sdk/openai'
import { convertToCoreMessages, streamText } from 'ai'
import { auth } from '@/auth'
import { saveChat } from '@/lib/queries'

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export const POST = auth(async (req) => {
  const { messages } = await req.json()

  const coreMessages = convertToCoreMessages(messages)

  if (!messages) {
    throw new Error('Message is required')
  }

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    messages: coreMessages,
    onFinish: async ({ text }) => {
      try {
        if (req.auth) {
          const userId = req.auth.user?.id as string
          const userMessage = coreMessages[0].content as string
          await saveChat({
            messages: [
              { role: 'user', content: userMessage },
              { role: 'assistant', content: text },
            ],
            userId,
          })
        }
      } catch (error) {
        console.log(error)
        console.error('Failed to save chat')
      }
    },
  })

  return result.toDataStreamResponse()
})
