import { differenceInMinutes, isFuture, isPast, lightFormat } from 'date-fns'


type OpeningTime = {
  willOpen: boolean
  isOpen: boolean
  wasOpen: boolean
  openingTime: string
  closingTime: string
  willCloseSoon: boolean
  openingDate: Date
  closingDate: Date
}

export function useOpeningTime(from: number, to: number): OpeningTime {
  if (!from || !to) {
    throw new Error(`Missing args ${from} ${to}`)
  }

  const now = new Date()
  const willOpen = isFuture(from)
  const isOpen = isPast(from) && isFuture(to)
  const wasOpen = isPast(from) && isPast(to)
  const hoursUntilClose = differenceInMinutes(to, now)

  return {
    openingTime: lightFormat(from, 'HH:mm'),
    closingTime: lightFormat(to, 'HH:mm'),
    openingDate: new Date(from),
    closingDate: new Date(to),
    willCloseSoon: hoursUntilClose <= 120,
    willOpen,
    isOpen,
    wasOpen
  }
}
