
import Markdown from "react-markdown"
export default function SendMessage({ message }) {
  return (
    <div className="flex justify-end ">
      <div className="bg-gray-100 text-black px-5 py-2  rounded-[2rem] max-w-[70%] overflow-auto">
        <p>{message}</p>
      </div>
    </div>
  )
}
