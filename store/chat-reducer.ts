/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit'

type ChatState = {
  isSidebarCollapsed: boolean
}

const initialState: ChatState = {
  isSidebarCollapsed: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed
    },
    openSidebar(state) {
      state.isSidebarCollapsed = true
    },
    closeSidebar(state) {
      state.isSidebarCollapsed = false
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar } = chatSlice.actions
export default chatSlice.reducer

/* eslint-disable */