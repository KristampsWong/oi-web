import Markdown from "react-markdown";

export default function ReceivedMessage({ message }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-white text-black p-2 rounded-full border border-gray-200 h-8 w-8 flex items-center justify-center">
        <span>OI</span>
      </div>
      <div className="flex flex-col gap-4">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  );
}