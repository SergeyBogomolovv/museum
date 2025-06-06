import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Музей купеческого быта',
  description:
    'Музей купеческого быта в Вышнем Волочке. История семьи Демидовых, торговля, традиции и повседневная жизнь купечества XIX–XX веков.',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
