import { Row } from '@/types';
import { setMinutes, setHours, setSeconds } from 'date-fns/fp'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export function getDates(row: Row): readonly Date[] {

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
            new Date(),
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
    );
    
}