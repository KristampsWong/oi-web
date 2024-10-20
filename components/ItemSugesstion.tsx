import { motion } from 'framer-motion'

export default function ItemSugesstion({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode
  title: string
  onClick: () => void
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  return (
    <motion.button
      className="flex rounded-full py-2 px-4 gap-2 hover:shadow-sm transition-colors duration-300
       hover:bg-zinc-50 items-center border border-gray-200 text-gray-600 text-sm
       w-[calc(50%-0.5rem)] sm:w-auto"
      onClick={onClick}
      variants={item}
    >
      {children}
      <span>{title}</span>
    </motion.button>
  )
}
