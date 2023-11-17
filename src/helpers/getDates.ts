import { setHours, setMinutes, setSeconds } from 'date-fns/fp'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { ResponseRow } from '../../api'

export function getDates(row: ResponseRow): readonly Date[] {

  const parseHoursAndMinutes = (time: string): O.Option<Date> => {
    return pipe(
      time,
      O.fromNullable,
      O.map((time: string) => time.split(':').map(Number)),
      O.map(getDate)
    )
  }

  const getDate = (maybeHoursAndMinutes: number[]) => {
    const [hours, minutes] = maybeHoursAndMinutes
    return pipe(
      new Date(row.DateDonation),
      setHours(hours),
      setMinutes(minutes),
      setSeconds(0)
    )
  }


  return pipe(
    [row?.FromHour, row?.ToHour],
    (times) => times.map(parseHoursAndMinutes),
    O.sequenceArray,
    O.getOrElse(() => [] as readonly Date[])
  )

}