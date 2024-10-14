/* eslint-disable @typescript-eslint/no-shadow, import/prefer-default-export */
import Link from 'next/link'
import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({
      node, inline, className, children, ...props
    }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <pre
          {...props}
          className={`${className} text-sm overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2`}
        >
          <code className={match[1]}>{children}</code>
        </pre>
      ) : (
        <code
          className={`${className} text-sm bg-zinc-100  py-0.5 px-1 rounded-md`}
          {...props}
        >
          {children}
        </code>
      )
    },
    ol: ({ node, children, ...props }: any) => (
        <ol className="list-decimal list-outside ml-4" {...props}>
          {children}
        </ol>
    ),
    li: ({ node, children, ...props }: any) => (
        <li className="py-1" {...props}>
          {children}
        </li>
    ),
    ul: ({ node, children, ...props }: any) => (
        <ul className="list-decimal list-outside pl-8" {...props}>
          {children}
        </ul>
    ),
    strong: ({ node, children, ...props }: any) => (
        <span className="font-semibold" {...props}>
          {children}
        </span>
    ),
    a: ({ node, children, ...props }: any) => (
        <Link
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </Link>
    ),
  }
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
)