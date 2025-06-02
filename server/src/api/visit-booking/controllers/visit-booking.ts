import { factories } from '@strapi/strapi'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export default factories.createCoreController('api::visit-booking.visit-booking', ({ strapi }) => ({
  async cancelBooking(ctx) {
    const { bookingCode } = ctx.request.body

    const emailService = strapi.plugin('email').service('email')

    if (!bookingCode || typeof bookingCode !== 'string') {
      return ctx.badRequest('Booking code is required')
    }

    const bookings = await strapi.documents('api::visit-booking.visit-booking').findMany({
      filters: { bookingCode },
      limit: 1,
    })

    if (!bookings || bookings.length === 0) {
      return ctx.notFound('Booking not found')
    }

    const booking = bookings[0]

    if (booking.bookingStatus === 'cancelled') {
      return ctx.badRequest('Booking already cancelled')
    }

    await strapi.documents('api::visit-booking.visit-booking').update({
      documentId: booking.documentId,
      data: {
        bookingStatus: 'cancelled',
      },
    })

    await emailService.send({
      to: process.env.ADMIN_EMAIL,
      subject: 'Посетитель отменил заявку на посещение',
      html: `
        <p><strong>Имя:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Дата и время:</strong> ${formatDateTime(booking.startTime.toString())}</p>
      `,
    })
    console.log('booking', booking)

    return ctx.send({ success: true })
  },
}))

function formatDateTime(isoDate: string): string {
  return format(parseISO(isoDate), 'dd.MM.yyyy HH:mm', { locale: ru })
}
