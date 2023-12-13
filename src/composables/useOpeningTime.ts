import { isFuture, isPast, lightFormat } from 'date-fns'

type OpeningTime = {
  willOpen: boolean
  isOpen: boolean
  wasOpen: boolean
  openingTime: string
  closingTime: string
  openingDate: Date
  closingDate: Date
}

export function useOpeningTime(fromDateString: string, toDateString: string): OpeningTime {
  if (!fromDateString || !toDateString) {
    throw new Error(`Missing args ${fromDateString} ${toDateString}`)
  }

  const from = new Date(fromDateString)
  const to = new Date(toDateString)

  const willOpen = isFuture(from)
  const isOpen = isPast(from) && isFuture(to)
  const wasOpen = isPast(from) && isPast(to)


  return {
    openingTime: lightFormat(from, 'HH:mm'),
    closingTime: lightFormat(to, 'HH:mm'),
    openingDate: from,
    closingDate: to,
    willOpen,
    isOpen,
    wasOpen
  }
}
