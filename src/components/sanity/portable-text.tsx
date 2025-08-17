import { PortableText, PortableTextComponents } from '@portabletext/react'
import { TypedObject } from '@portabletext/types'
import Image from 'next/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <div className="my-8">
          <Image
            src={(value as { asset?: { url?: string } })?.asset?.url || ''}
            alt={value.alt || 'Blog image'}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    codeBlock: ({ value }) => (
      <div className="my-6">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-va-text-primary font-montserrat">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3 text-va-text-primary font-montserrat">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-5 mb-2 text-va-text-primary font-montserrat">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2 text-va-text-primary font-montserrat">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-va-text-secondary font-roboto leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-va-primary pl-4 my-6 italic text-va-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-va-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-va-text-secondary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-va-primary hover:text-va-secondary underline"
        target={value.href?.startsWith('http') ? '_blank' : undefined}
        rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-va-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
}

interface PortableTextRendererProps {
  value: TypedObject | TypedObject[]
  className?: string
}

export function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}