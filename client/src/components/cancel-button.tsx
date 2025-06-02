'use client'

import { API_URL } from '@/shared/contstants'

export function CancelButton() {
  return (
    <button onClick={cancelBooking} className='cursor-pointer font-bold'>
      Отменить запись
    </button>
  )
}

async function cancelBooking() {
  const code = prompt('Введите код записи')
  if (!code) {
    return
  }
  const res = await fetch(`${API_URL}/api/visit-booking/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookingCode: code }),
  })

  if (res.ok) {
    alert('Запись отменена')
  } else {
    alert('Запись не найдена')
  }
}
