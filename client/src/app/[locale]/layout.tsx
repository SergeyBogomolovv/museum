import Header from '@/components/header'
import Footer from '@/components/footer'
import { API_URL } from '@/shared/contstants'
import { FooterResponseSchema, HeaderResponseSchema } from '@/shared/schemas'

type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: 'en' | 'ru'
  }>
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params
  const headerData = await getHeaderData(locale)
  const footerData = await getFooterData(locale)

  return (
    <html lang={locale}>
      <body className='antialiased flex flex-col min-h-screen'>
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
      </body>
    </html>
  )
}

async function getHeaderData(locale: string) {
  const res = await fetch(`${API_URL}/api/header?populate=links&locale=${locale}`)
  const result = await res.json()
  return HeaderResponseSchema.parse(result).data
}

async function getFooterData(locale: string) {
  const res = await fetch(`${API_URL}/api/footer?populate=sections.links&locale=${locale}`)
  const result = await res.json()
  return FooterResponseSchema.parse(result).data
}
