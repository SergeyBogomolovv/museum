'use client'
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import Link from 'next/link'

export default function TextRenderer({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      blocks={{
        paragraph: ({ children }) => <p>{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className='text-4xl font-bold my-3'>{children}</h1>
            case 2:
              return <h2 className='text-3xl font-semibold my-2'>{children}</h2>
            case 3:
              return <h3 className='text-2xl'>{children}</h3>
            default:
              return <p>{children}</p>
          }
        },
        link: ({ children, url }) => <Link href={url}>{children}</Link>,
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className='italic'>{children}</span>,
      }}
      content={content}
    />
  )
}
