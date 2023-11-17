export function getAddress({ city = '', street = '', number = '' }): string {
  const address: any = []

  ;[city, street, number].forEach((item) => {
    if (item) {
      address.push(String(item.trim()))
    }
  })

  return address.join(', ').replace(/\s+/g, ' ')
}
