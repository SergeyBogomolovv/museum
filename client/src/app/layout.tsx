import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Museum',
  description: 'Museum description',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
