import { FooterResponseSchema } from '@/shared/schemas'
import Link from 'next/link'
import { z } from 'zod'
import { CancelButton } from './cancel-button'

export default function Footer({ data }: z.infer<typeof FooterResponseSchema>) {
  return (
    <footer className='bg-primary p-4 md:p-16 flex flex-col'>
      <div className='container m-auto flex flex-col md:flex-row justify-between items-center md:items-start'>
        {data.sections.map((section) => (
          <div key={section.id} className='flex p-2 md:p-4'>
            <div className='flex flex-col md:flex-col items-center md:items-start text-center md:text-left gap-2 w-full'>
              <h3 className='font-semibold text-lg mb-2'>{section.title}</h3>
              {section.description?.split('\n').map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.links?.map((link) => (
                <Link className='hover:underline' key={link.id} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <CancelButton />
    </footer>
  )
}
