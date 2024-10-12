import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/store/conversationSlice';

export function CreateChatSubmitHandler() {
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.conversation.messageList);

  return async function handleChatSubmit(inputMessage) {
    const textMessage = { content: inputMessage, role: 'user' };
    dispatch(addMessage(textMessage));

    const messageToSend =
      messageList.length > 0 ? [...messageList, textMessage] : [textMessage];
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
        }),
      });
      
      const data = await response.json();
      
      dispatch(
        addMessage({
          content: data.choices[0]?.message?.content,
          role: data.choices[0]?.message?.role,
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show error message to user)
    }
  };
}
