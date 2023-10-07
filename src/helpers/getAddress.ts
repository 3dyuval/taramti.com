import { Row } from '@/types'

export function getAddress(row: Row | undefined): string {
  const address: any = []

  ;[row?.City, row?.Street, row?.NumHouse].forEach((item) => {
    if (item) {
      address.push(String(item.trim()))
    }
  })

  return address.join(', ').replace(/\s+/g, ' ')
}
