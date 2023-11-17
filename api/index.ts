import madaRequest from './madaRequest'
import { isToday } from 'date-fns'
import { db } from './db'
import { getAddress } from '../src/helpers/getAddress'
import { getDates } from '../src/helpers/getDates'

export type DonationLocation = {
  name: string;
  timeOpen: string
  timeClose: string;
  schedulingUrl?: string;
  address: {
    city: string | null;
    street: string | null;
    number: string | null;
  }
}

export async function saveData(locations: DonationLocation[]): Promise<DonationLocation[]> {

  console.log(
    `trying to save data with '${locations.length}' records`
  )

  const result = await db.insert('donationLocation', locations)

  console.log(`successully saved '${result.length}' records`)

  return result
}

export type ResponseRow = {
  DateDonation: string
  FromHour: string
  ToHour: string
  Name: string
  City: string
  Street: string
  NumHouse: string
  AccountType: string
  SchedulingURL: string
}

export async function getData() {

  const { Result, Success } = await fetch(madaRequest()).then((res) => res.json())

  if (!Success) {
    return Promise.reject('No data was fetched')
  }

  const rowsSet = new Set<ResponseRow>(JSON.parse(Result))

  const donationLocations = new Map<
    DonationLocation['name'],
    Omit<DonationLocation, 'name'>
  >()

  for (let row of rowsSet) {
    const [timeOpen, timeClose] = getDates(row)
      .map((date) => date.toISOString())

    const getName = (row: ResponseRow) =>
      (row.Name
          ? row.Name
          : row.AccountType
            ? row.AccountType
            : getAddress(row)
      )
        .replace(/\s+/g, ' ')
        .trim()

    if (timeOpen && timeClose && isToday(new Date(row.DateDonation))) {
      donationLocations.set(
        getName(row), {
          timeOpen,
          timeClose,
          schedulingUrl: row.SchedulingURL,
          address: {
            city: !row?.City || row.City === '' ? null : row.City,
            street: !row?.Street || row.Street === '' ? null : row.Street,
            number: !row?.NumHouse || row.NumHouse === '' ? null : row.NumHouse
          }
        })
    }
  }


  return [...donationLocations.entries()]
    .map(([name, location]) => ({
      name,
      ...location
    }))
}

export async function getRows() {
  const data = await db.query('SELECT * FROM donationLocation WHERE updatedAt == time::floor(time::now(), 1d);')

  let rows: any[] = []

  if (data[0].status === 'OK' && data[0].result?.length) {
    rows = data[0].result
  } else {
    const data = await getData()
    rows = await saveData(data)
  }

  return rows
}

