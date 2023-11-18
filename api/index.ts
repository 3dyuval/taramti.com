import madaRequest from './madaRequest'
import { db } from './db'
import { getAddress } from '../src/helpers/getAddress'
import { getDates } from '../src/helpers/getDates'
import type { DonationLocationDate } from '../src/types'

export async function getData() {

  const { Result, Success } = await fetch(madaRequest()).then((res) => res.json())

  if (!Success) {
    return Promise.reject('No data was fetched')
  }

  const donationLocationDates = new Array<donationLocationDate>()
  for (let row of JSON.parse(Result)) {
    const [dateOpen, dateClose] = getDates(row)
      .map((date) => date.toISOString())

    const name = (row.Name
        ? row.Name
        : row.AccountType
          ? row.AccountType
          : getAddress(row)
    )
      .replace(/\s+/g, ' ')
      .trim()

    if (name && dateOpen && dateClose)
      donationLocationDates.push({
        dateOpen,
        dateClose,
        donationLocation: {
          name,
          schedulingUrl: row.SchedulingURL,
          address: {
            city: !row?.City || row.City === '' ? null : row.City,
            street: !row?.Street || row.Street === '' ? null : row.Street,
            number: !row?.NumHouse || row.NumHouse === '' ? null : row.NumHouse
          }
        }
      })
  }


  return donationLocationDates
}


export async function saveData(dates: DonationLocationDate[]): Promise<DonationLocationDate[]> {

  console.log(
    `trying to save data with '${dates.length}' records`
  )

  const resultLocations = await db.insert('donationLocation', dates.map(({ donationLocation }) => donationLocation))

  const dateWithLocation = dates.map(({ dateOpen, dateClose, donationLocation: { name } }, index) => ({
    dateOpen,
    dateClose,
    donationLocation: resultLocations.find((location) => location.name === name)?.id
  }))


  const resultLocationDates = await db.insert('donationLocationDates', dateWithLocation)

  console.log(`successully saved '${resultLocations.length}' resultLocations records, and ${resultLocationDates.length} resultLocationDates records`)

  return dates
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

export async function getRows() {
  const data = await db.query(
    `SELECT *, donationLocation.* 
    FROM donationLocationDates
    WHERE time::floor(dateOpen, 1d) == time::floor(time::now(), 1d);
    `)

  let rows: any[] = []

  if (data[0].status === 'OK' && data[0].result?.length) {
    rows = data[0].result
  } else {
    const data = await getData()
    rows = await saveData(data)
  }

  return rows
}

