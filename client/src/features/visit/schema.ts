import { z } from 'zod'
import { getDay, getHours, parseISO, isValid } from 'date-fns'
import { translations } from './locales'

export const schema = (maxVisitorsCount: number, locale: 'ru' | 'en') => {
  const t = translations[locale].validation

  return z.object({
    name: z.string().min(1, t.name),
    wishes: z.string().optional(),
    email: z.string().email(t.email),
    startTime: z
      .string()
      .min(1, t.dateRequired)
      .refine(
        (val) => {
          const date = parseISO(val)
          if (!isValid(date)) return false
          const day = getDay(date)
          const hour = getHours(date)
          const isDayValid = day >= 1 && day <= 6
          const isHourValid = hour >= 12 && hour < 17
          return isDayValid && isHourValid
        },
        {
          message: t.dateInvalid,
        },
      ),
    visitorsCount: z
      .number({ invalid_type_error: t.notNumber })
      .int(t.notInt)
      .positive(t.notPositive)
      .max(maxVisitorsCount, t.tooMany),
  })
}
