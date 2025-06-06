import { API_URL } from '@/shared/contstants'
import { MainPageResponseSchema } from '@/shared/schemas'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ locale: 'en' | 'ru' }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  const { hero, details, features } = await fetchMainPageData(locale)

  return (
    <main className='flex-1 flex flex-col items-center'>
      <section className='relative w-full lg:aspect-[16/6] md:aspect-video aspect-square'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={API_URL + hero.cover.url}
            alt='Hero background'
            fill
            priority
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
        </div>

        <div className='relative z-10 container m-auto flex flex-col justify-center md:items-start items-center h-full gap-16 p-16'>
          <h1 className='md:text-6xl sm:text-5xl text-4xl font-extrabold whitespace-pre-wrap'>
            {hero.title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>
          <Link
            href={hero.buttonHref}
            className='px-16 py-4 text-primary bg-white w-fit hover:bg-primary hover:text-white duration-150 cursor-pointer text-xl font-bold'
          >
            {hero.buttonLabel}
          </Link>
        </div>
      </section>

      <section className='bg-primary p-4 md:p-16 w-full'>
        <div className='flex flex-col md:flex-row container m-auto justify-center items-center md:items-stretch divide-y md:divide-y-0 md:divide-x divide-white'>
          {details.map((detail) => (
            <div key={detail.id} className='flex flex-1 p-8'>
              <div className='flex flex-col md:flex-row items-center justify-center w-full gap-4'>
                <Image
                  className='size-16 lg:size-32 md:mr-4'
                  src={API_URL + detail.icon.url}
                  alt={detail.icon.alternativeText ?? ''}
                  width={144}
                  height={144}
                />
                <div className='text-center md:text-left text-xl lg:text-2xl'>
                  <h3 className='font-semibold mb-4'>{detail.title}</h3>
                  <p className='whitespace-pre-wrap'>{detail.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-10 py-10 container'>
        {features.map((feature) => (
          <div key={feature.id} className='flex flex-col md:flex-row items-center gap-10'>
            <div className='relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden p-2'>
              <Image
                src={API_URL + feature.cover.url}
                alt={feature.cover.alternativeText ?? ''}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent' />

              <div className='relative z-10 text-white max-w-2xl p-8 md:p-16'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>{feature.title}</h2>
                <p className='mb-6 text-xl'>{feature.description}</p>
                <Link
                  href={feature.href}
                  className='border border-white px-4 py-2 hover:bg-white hover:text-primary transition cursor-pointer'
                >
                  {feature.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

async function fetchMainPageData(locale: string) {
  const res = await fetch(
    `${API_URL}/api/main-page?populate[features][populate]=cover&populate[hero][populate]=cover&populate[details][populate]=icon&locale=${locale}`,
  )
  const result = await res.json()
  return MainPageResponseSchema.parse(result).data
}
