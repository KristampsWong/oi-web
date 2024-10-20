import { createSlice } from "@reduxjs/toolkit"

type ChatState = {
  isSidebarCollapsed: boolean
}

const initialState: ChatState = {
  isSidebarCollapsed:
    typeof window !== "undefined" &&
    window.localStorage.getItem("isSidebarCollapsed") === "false",
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleSidebar(state) {
      localStorage.setItem(
        "isSidebarCollapsed",
        JSON.stringify(!state.isSidebarCollapsed)
      )
      state.isSidebarCollapsed = !state.isSidebarCollapsed
    },
    openSidebar(state) {
      localStorage.setItem("isSidebarCollapsed", JSON.stringify(true))
      state.isSidebarCollapsed = true
    },
    closeSidebar(state) {
      localStorage.setItem("isSidebarCollapsed", JSON.stringify(false))
      state.isSidebarCollapsed = false
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar } = chatSlice.actions
export default chatSlice.reducer
