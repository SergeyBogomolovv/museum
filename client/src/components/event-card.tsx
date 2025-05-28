import Image from 'next/image'
import { format, isToday, isTomorrow, isThisYear } from 'date-fns'
import { ru } from 'date-fns/locale'

type Props = {
  title: string
  description: string
  imageUrl: string
  eventDate: string
}

export default function EventCard({ title, description, imageUrl, eventDate }: Props) {
  return (
    <div className='bg-primary text-white rounded-md shadow-lg overflow-hidden max-w-xl'>
      <Image
        width={400}
        height={400}
        src={imageUrl}
        alt={title}
        className='w-full h-64 object-cover'
      />
      <div className='p-6'>
        <p className='text-sm italic text-gray-200 mb-2'>{formatEventDate(eventDate)}</p>
        <h2 className='text-2xl font-serif font-bold mb-3'>{title}</h2>
        <p className='text-base font-light leading-relaxed'>{description}</p>
      </div>
    </div>
  )
}

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr)

  if (isToday(date)) {
    return `Сегодня, ${format(date, 'HH:mm')}`
  }

  if (isTomorrow(date)) {
    return `Завтра, ${format(date, 'HH:mm')}`
  }

  if (isThisYear(date)) {
    return format(date, 'dd.MM, HH:mm', { locale: ru })
  }

  return format(date, 'dd.MM.yyyy', { locale: ru })
}
