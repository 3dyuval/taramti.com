import { Row } from '../src/types'
import { getDates } from '../src/helpers/getDates'
import { getAddress } from '../src/helpers/getAddress'
import { DonationLocation } from './index'

export async function processMadaResponse(data: Row[]) {

  const donationLocations = new Map<
    string,
    DonationLocation
  >()


  for (let rec of data) {
    const [timeOpen, timeClose] = getDates(rec)
      .map((date) => date.toISOString())

    const getName = (rec: Row) =>
      (rec.Name
          ? rec.Name
          : rec.AccountType
            ? rec.AccountType
            : getAddress(rec)
      )
        .replace(/\s+/g, ' ')
        .trim()

    if (timeOpen && timeClose) {
      donationLocations.set(getName(rec), {
        timeOpen,
        timeClose,
        ...rec
      })
    }
  }

  const addresses = new Set<Record<string, string>>()

  for (const [name, rec] of donationLocations.entries()) {
    addresses.add({
      name,
      city: !rec?.City || rec.City === '' ? null : rec.City,
      street: !rec?.Street || rec.Street === '' ? null : rec.Street,
      number: !rec?.NumHouse || rec.NumHouse === '' ? null : rec.NumHouse
    })
  }

  return { donationLocations, addresses }
}