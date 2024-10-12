import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messageList: [],
}

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messageList.push(action.payload)

    },
    cleanMessages: (state) => {
      state.messageList = []
    },
  },
})

export const { addMessage, cleanMessages } = conversationSlice.actions

export default conversationSlice.reducer
