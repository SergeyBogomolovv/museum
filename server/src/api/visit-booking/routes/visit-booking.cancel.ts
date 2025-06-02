export default {
  routes: [
    {
      method: 'POST',
      path: '/visit-booking/cancel',
      handler: 'visit-booking.cancelBooking',
      config: {
        auth: false,
      },
    },
  ],
}
