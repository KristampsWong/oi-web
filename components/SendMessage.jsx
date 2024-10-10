export default function SendMessage({ message }) {
  return (
    <div className="flex justify-end ">
      <div className="bg-gray-100 text-black px-5 py-2  rounded-full max-w-[70%] break-words">
        <p>{message}</p>
      </div>
    </div>
  )
}
