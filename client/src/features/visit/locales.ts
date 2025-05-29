export const translations = {
  ru: {
    name: 'Имя',
    namePlaceholder: 'Иван Иванов',
    nameHint: 'Введите ваше полное имя',

    email: 'Email',
    emailPlaceholder: 'example@example.com',
    emailHint: 'Мы пришлём подтверждение на этот адрес',

    startTime: 'Начало экскурсии',
    startTimeHint: 'Выберите дату и время начала',

    visitorsCount: 'Количество человек',
    visitorsCountPlaceholder: 'Введите количество человек',
    visitorsCountHint: (max: number) => `Максимум ${max} человек за одну экскурсию`,

    wishes: 'Пожелания',
    wishesPlaceholder: 'Пожелания',

    success: 'Ваша заявка отправлена',
    error: 'Что-то пошло не так',

    submit: 'Отправить заявку',
    validation: {
      name: 'Укажите имя',
      email: 'Некорректный email',
      dateRequired: 'Укажите дату',
      dateInvalid: 'Выберите день с Пн по Сб, с 12:00 до 17:00',
      notNumber: 'Должно быть числом',
      notInt: 'Целое число',
      notPositive: 'Больше нуля',
      tooMany: 'Слишком много',
    },
  },

  en: {
    name: 'Name',
    namePlaceholder: 'John Smith',
    nameHint: 'Enter your full name',

    email: 'Email',
    emailPlaceholder: 'example@example.com',
    emailHint: 'We will send confirmation to this address',

    startTime: 'Tour start time',
    startTimeHint: 'Select date and time of the tour',

    visitorsCount: 'Number of visitors',
    visitorsCountPlaceholder: 'Enter number of people',
    visitorsCountHint: (max: number) => `Maximum ${max} people per tour`,

    wishes: 'Wishes',
    wishesPlaceholder: 'Wishes',

    success: 'Your request has been sent',
    error: 'Something went wrong',

    submit: 'Submit request',
    validation: {
      name: 'Please enter your name',
      email: 'Invalid email address',
      dateRequired: 'Please provide a date',
      dateInvalid: 'Choose a weekday (Mon–Sat), between 12:00 and 17:00',
      notNumber: 'Must be a number',
      notInt: 'Must be an integer',
      notPositive: 'Must be greater than zero',
      tooMany: 'Too many people',
    },
  },
}
