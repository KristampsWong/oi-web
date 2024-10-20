import { createSlice } from "@reduxjs/toolkit"

type ChatState = {
  isSidebarOpen: boolean
}

const initialState: ChatState = {
  isSidebarOpen: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    openSidebar(state) {
      state.isSidebarOpen = true
    },
    closeSidebar(state) {
      state.isSidebarOpen = false
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar } = chatSlice.actions
export default chatSlice.reducer
