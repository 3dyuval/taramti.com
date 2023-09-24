import { isPast, isFuture } from 'date-fns'

type OpeningTime = {
  willOpen: boolean
  isOpen: boolean
  wasOpen: boolean
  openingTime: string
  closingTime: string
  openingDate: Date
  closingDate: Date
}

export function useOpeningTime(from: string, to: string): OpeningTime {
  if (!from || !to) {
    throw 'Missing args "from" or "to"'
  }

  const fromHourToday = new Date()
  const toHourToday = new Date()

  const parseHoursAndMinutes = (time: string): [number, number] => {
    const [hours, minutes] = time.split(':').map(Number)
    return [hours, minutes]
  }

  const [fromHour, fromMinute] = parseHoursAndMinutes(from)
  const [toHour, toMinute] = parseHoursAndMinutes(to)

  fromHourToday.setHours(fromHour, fromMinute, 0)
  toHourToday.setHours(toHour, toMinute, 0)

  const willOpen = isFuture(fromHourToday)
  const isOpen = isPast(fromHourToday) && isFuture(toHourToday)
  const wasOpen = isPast(fromHourToday) && isPast(toHourToday)

  return {
    openingTime: from,
    closingTime: to,
    openingDate: fromHourToday,
    closingDate: toHourToday,
    willOpen,
    isOpen,
    wasOpen,
  }
}
