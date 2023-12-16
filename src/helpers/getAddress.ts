import type { DonationLocationDate } from '@/types'


export function getAddress(location: DonationLocationDate) {

  const { city = '', street = '', number = '' } = location.donationLocation.address

  const address: any = []

  ;[city, street, number].forEach((item) => {
    if (item) {
      address.push(String(item.trim()))
    }
  })

  return address.join(', ').replace(/\s+/g, ' ')
}
