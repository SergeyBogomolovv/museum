import TextRenderer from '@/components/text-renderer'
import { API_URL } from '@/shared/contstants'
import { AboutPageResponseSchema } from '@/shared/schemas'
import Image from 'next/image'

type Props = {
  params: Promise<{
    locale: string
  }>
}

export default async function About({ params }: Props) {
  const { locale } = await params
  const { hero, content } = await fetchAboutData(locale)

  return (
    <main className='flex-1 space-y-10 bg-white pb-10'>
      <section className='relative w-full  flex items-center overflow-hidden'>
        <Image
          src={API_URL + hero.cover.url}
          alt={hero.cover.alternativeText ?? ''}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent' />
        <div className='relative z-10 max-w-4xl mx-auto w-full px-8 lg:px-0 py-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>{hero.title}</h2>
          <p className='mb-6 text-xl max-w-2xl'>{hero.description}</p>
        </div>
      </section>

      <section className='text-black font-sans max-w-4xl mx-auto p-8 md:p-0'>
        {content.map((block) => {
          switch (block.__component) {
            case 'about.image':
              return (
                <Image
                  key={block.id}
                  src={API_URL + block.image.url}
                  alt={block.image.alternativeText ?? ''}
                  width={block.image.width ?? 400}
                  height={400}
                  className='my-5 w-full'
                />
              )
            case 'about.text':
              return <TextRenderer key={block.id} content={block.text} />
            default:
              return null
          }
        })}
      </section>
    </main>
  )
}

async function fetchAboutData(locale: string) {
  const res = await fetch(
    `${API_URL}/api/about-page?populate[content][populate]=*&populate[hero][populate]=*&locale=${locale}`,
  )
  const result = await res.json()
  return AboutPageResponseSchema.parse(result).data
}
