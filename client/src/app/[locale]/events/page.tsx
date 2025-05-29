import EventCard from '@/components/event-card'
import { API_URL } from '@/shared/contstants'
import { EventsResponseSchema } from '@/shared/schemas'

type Props = {
  params: Promise<{
    locale: 'en' | 'ru'
  }>
}

export default async function Events({ params }: Props) {
  const { locale } = await params
  const events = await fetchEvents(locale)

  return (
    <main className='flex-1 flex flex-col gap-10 p-6 md:p-10 items-center'>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          description={event.description}
          imageUrl={API_URL + event.image.url}
          eventDate={event.eventDate}
        />
      ))}
    </main>
  )
}

async function fetchEvents(locale: string) {
  const res = await fetch(`${API_URL}/api/events?populate=image&locale=${locale}`)
  const result = await res.json()
  return EventsResponseSchema.parse(result).data
}
