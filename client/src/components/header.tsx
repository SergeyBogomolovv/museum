'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { z } from 'zod'
import { HeaderResponseSchema } from '@/shared/schemas'

export default function Header({ data }: z.infer<typeof HeaderResponseSchema>) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className='p-8 bg-primary'>
      <div className='flex justify-between items-center container mx-auto'>
        <Link href={'/'}>
          <h1 className='font-bold text-3xl sm:text-4xl'>{data.title}</h1>
        </Link>

        <nav className='hidden md:flex text-lg font-semibold items-center gap-6'>
          {data.links.map((link) => (
            <Link key={link.id} href={link.href} className='hover:text-secondary duration-150'>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className='md:hidden text-white cursor-pointer'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Меню'
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {menuOpen && (
        <nav className='md:hidden bg-primary text-lg font-semibold flex flex-col items-center gap-4 py-4'>
          {data.links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className='hover:text-secondary duration-150'
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
