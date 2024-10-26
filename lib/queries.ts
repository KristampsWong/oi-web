import Conversation from '@/models/conversation.model'
import { CoreMessage } from 'ai'
import dbConnect from './dbConnect'

/* eslint-disable import/prefer-default-export */
export async function saveChat({
  messages,
  userId,
}: {
  messages: CoreMessage[]
  userId: string
}) {
  await dbConnect()

  const conversation = new Conversation({
    userId,
    messages,
  })

  await conversation.save()
}
