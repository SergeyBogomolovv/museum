import VisitForm from '@/features/visit/visit-form'
import { API_URL } from '@/shared/contstants'
import { BookVisitPageResponseSchema } from '@/shared/schemas'
import Image from 'next/image'

type Props = {
  params: Promise<{
    locale: 'en' | 'ru'
  }>
}

export default async function BookVisitPage({ params }: Props) {
  const { locale } = await params
  const data = await fetchBookVisitPageData(locale)

  return (
    <main className='flex-1 flex flex-col md:flex-row bg-white max-w-5xl mx-auto w-full p-6 gap-6'>
      <section className='bg-gray-200 flex-2'>
        <Image
          src={API_URL + data.image.url}
          width={500}
          height={500}
          alt={data.image.alternativeText ?? ''}
          className='w-full'
        />
        <div className='text-black p-4'>
          <h1 className='text-2xl my-2'>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </section>
      <section className='flex-3'>
        <h1 className='bg-primary text-xl p-3 mb-2'>{data.formTitle}</h1>
        <VisitForm maxVisitorsCount={data.maxVisitorsCount} locale={locale} />
      </section>
    </main>
  )
}

async function fetchBookVisitPageData(locale: string) {
  const res = await fetch(`${API_URL}/api/book-visit-page?populate=image&locale=${locale}`)
  const result = await res.json()
  console.log(result)
  return BookVisitPageResponseSchema.parse(result).data
}
