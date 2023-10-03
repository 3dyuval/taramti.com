import { expect, it } from 'vitest'
import { getDates } from './getDates'
import type { Row } from '@/types'


const row: Row = {
  'DateDonation': '2023-09-24T00:00:00',
  'FromHour': '08:00',
  'ToHour': '13:30',
  'Name': 'בית תבורי 1937',
  'City': 'פרדס חנה כרכור',
  'Street': '',
  'NumHouse': '',
  'AccountType': '',
  'SchedulingURL': 'https://bd.mda.org.il/#/org-schedule/0F665C6A-0AAB-40B2-8CA2-9C0E9687EC20'
}


it('It should return empty array if no dates', () => {
  //@ts-expect-error
  expect(getDates()).toEqual([])
})


it('It should return the correct date', () => {

  const date1 = new Date()
  date1.setHours(8)
  date1.setMinutes(0)
  date1.setSeconds(0)


  const result = getDates(row)

  expect(result[0].toISOString().slice(0, -5))
    .toBe(date1.toISOString().slice(0, -5))

})