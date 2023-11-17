import madaRequest from './madaRequest'
import { Row } from '@/types'
import { processMadaResponse } from './processMadaRequest'
import { db } from './db'

export type DonationLocation = Row & { timeOpen: string; timeClose: string }

export async function getData(): Promise<any> {

  const { Result, Success } = await fetch(madaRequest()).then((res) => res.json())

  if (!Success) {
    return Promise.reject('No data was fetched')
  }

  const parsed = JSON.parse(Result)
  const data = await processMadaResponse(parsed)
  const addresses = Array.from(data.addresses)


  console.log(
    `trying to write 'addresses' with '${data.addresses.size}' records`
  )


  const addressResult = await db.insert(
    'addresses',
    addresses
  )

  console.log(`successully written addresses with '${addressResult.length}' records`)

  console.log(
    `trying to populate 'donationLocation' with '${data.donationLocations.size}' records`
  )


  const donationLocationsResult = await db.insert(
    'donationLocation',
    addressResult.map(({ id, name }: any) => {
      const rec = data.donationLocations.get(name)
      return {
        name,
        address: id,
        timeOpen: rec?.timeOpen,
        timeClose: rec?.timeClose
      }
    })
  )
  console.log(
    `successully written '${donationLocationsResult.length}' records`
  )

  return Promise.resolve()

}


export default {
  getData
}