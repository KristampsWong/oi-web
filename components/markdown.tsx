/* eslint-disable */
import Link from 'next/link'
import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscdarkplus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import remarkGfm from 'remark-gfm'

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({
      node, inline, className, children, ...props
    }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const langugae = match ? match[1] : ''
      return !inline && match ? (
        <>
          <div className="rounded-t-lg h-9 bg-zinc-700 text-sm text-neutral-400 font-sans px-4 py-2">
            {langugae}
          </div>
          <SyntaxHighlighter
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={langugae}
            style={vscdarkplus}
            customStyle={{
              marginTop: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        </>
      ) : (
        <code
          className={`${className} text-sm bg-zinc-100  py-1 px-2 rounded-md break-all`}
          {...props}
        >
          {children}
        </code>
      )
    },
    ol: ({ node, children, ...props }: any) => (
      <ol className="list-decimal list-outside ml-6" {...props}>
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="py-2" {...props}>
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
    p: ({ node, children, ...props }: any) => (
      <p className="font-medium py-2" {...props}>
        {children}
      </p>
    ),
    h3: ({ node, children, ...props }: any) => (
      <h3 className="text-lg font-semibold py-2" {...props}>
        <strong>{children}</strong>
      </h3>
    ),
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  )
}

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
)
