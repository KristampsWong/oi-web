"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

import HomePage from "@/components/HomePage";
export default function Page() {
  return (
    // <div className="flex items-center justify-center h-screen flex-col gap-4 ">
    //   Home
    //   {session?.user?.name && <h2>Hello {session?.user?.name}</h2>}
    //
    // </div>
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
