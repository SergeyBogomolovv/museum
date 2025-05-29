'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { z } from 'zod'
import { translations } from './locales'
import { API_URL } from '@/shared/contstants'
import { useState } from 'react'

type Props = {
  maxVisitorsCount: number
  locale: 'en' | 'ru'
}

export default function VisitForm({ maxVisitorsCount, locale }: Props) {
  const [isSubmited, setIsSubmited] = useState(false)
  const [isError, setIsError] = useState(false)

  const t = translations[locale]
  const formSchema = schema(maxVisitorsCount, locale)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      data: {
        name: data.name,
        email: data.email,
        startTime: data.startTime,
        visitorsCount: data.visitorsCount,
        wishes: data.wishes,
      },
    }
    const res = await fetch(`${API_URL}/api/visit-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      setIsError(true)
      return
    }
    setIsSubmited(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 text-black'>
      <div>
        <label className='block font-medium mb-1'>{t.name}</label>
        <input
          type='text'
          {...register('name')}
          placeholder={t.namePlaceholder}
          className='input'
        />
        <p className='text-xs mt-1'>{t.nameHint}</p>
        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
      </div>

      <div>
        <label className='block font-medium mb-1'>{t.email}</label>
        <input
          type='email'
          {...register('email')}
          placeholder={t.emailPlaceholder}
          className='input'
        />
        <p className='text-xs mt-1'>{t.emailHint}</p>
        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
      </div>

      <div>
        <label className='block font-medium mb-1'>{t.startTime}</label>
        <input type='datetime-local' {...register('startTime')} className='input' />
        <p className='text-xs mt-1'>{t.startTimeHint}</p>
        {errors.startTime && (
          <p className='text-red-500 text-sm mt-1'>{errors.startTime.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium mb-1'>{t.visitorsCount}</label>
        <input
          type='number'
          {...register('visitorsCount', { valueAsNumber: true })}
          placeholder={t.visitorsCountPlaceholder}
          className='input'
        />
        <p className='text-xs mt-1'>{t.visitorsCountHint(maxVisitorsCount)}</p>
        {errors.visitorsCount && (
          <p className='text-red-500 text-sm mt-1'>{errors.visitorsCount.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium mb-1'>{t.wishes}</label>
        <textarea {...register('wishes')} placeholder={t.wishesPlaceholder} className='input' />
        {errors.wishes && <p className='text-red-500 text-sm mt-1'>{errors.wishes.message}</p>}
      </div>

      <button
        type='submit'
        className='w-full bg-secondary py-2 rounded-md hover:bg-orange-700 transition font-bold cursor-pointer text-white'
      >
        {t.submit}
      </button>
      {isSubmited && (
        <div className='text-green-800 px-4 py-2 rounded-md text-center mt-1 bg-green-400/40'>
          {t.success}
        </div>
      )}
      {isError && (
        <div className='text-red-800 px-4 py-2 rounded-md text-center mt-1 bg-red-400/40'>
          {t.error}
        </div>
      )}
    </form>
  )
}
