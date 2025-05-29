import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export default {
  async beforeCreate(event) {
    event.params.data.bookingCode = generateBookingCode()
  },

  async afterCreate(event) {
    const { result } = event

    if (result.isAdminEmailSent) {
      return
    }

    const emailService = strapi.plugin('email').service('email')
    try {
      await emailService.send({
        to: process.env.ADMIN_EMAIL,
        subject: 'Новая заявка на посещение',
        html: `
        <h2>Новая заявка на посещение</h2>
        <p><strong>Имя:</strong> ${result.name}</p>
        <p><strong>Email:</strong> ${result.email}</p>
        <p><strong>Дата и время:</strong> ${formatDateTime(result.startTime)}</p>
        <p><strong>Количество посетителей:</strong> ${result.visitorsCount}</p>
        <p><strong>Пожелания:</strong> ${result.wishes || '—'}</p>
      `,
      })
      await strapi.db.query('api::visit-booking.visit-booking').update({
        where: { id: result.id },
        data: { isAdminEmailSent: true },
      })
    } catch (error) {
      strapi.log.error('Ошибка при отправке письма:', error)
    }
  },

  async afterUpdate(event) {
    const { result } = event
    const emailService = strapi.plugin('email').service('email')
    const status = result.bookingStatus
    const userEmail = result.email

    if (result.isUserEmailSent) {
      return
    }

    if (status === 'confirmed') {
      try {
        await emailService.send({
          to: userEmail,
          subject: 'Заявка подтверждена',
          html: `
          <h2>Ваша заявка на посещение подтверждена!</h2>
          <p><strong>Код бронирования:</strong> ${result.bookingCode}</p>
          <p><strong>Дата и время:</strong> ${formatDateTime(result.startTime)}</p>
          <p><strong>Кол-во посетителей:</strong> ${result.visitorsCount}</p>
        `,
        })
        await strapi.db.query('api::visit-booking.visit-booking').update({
          where: { id: result.id },
          data: { isUserEmailSent: true },
        })
      } catch (error) {
        strapi.log.error('Ошибка при отправке письма:', error)
      }
    }

    if (status === 'cancelled') {
      try {
        await emailService.send({
          to: userEmail,
          subject: 'Заявка отклонена',
          html: `
          <h2>Заявка отклонена</h2>
          <p>К сожалению, ваша заявка была отклонена.</p>
          <p><strong>Причина отказа:</strong> ${result.rejectReason || 'Не указана'}</p>
        `,
        })
        await strapi.db.query('api::visit-booking.visit-booking').update({
          where: { id: result.id },
          data: { isUserEmailSent: true },
        })
      } catch (error) {
        strapi.log.error('Ошибка при отправке письма:', error)
      }
    }
  },
}

function generateBookingCode(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

function formatDateTime(isoDate: string): string {
  return format(parseISO(isoDate), 'dd.MM.yyyy HH:mm', { locale: ru })
}
