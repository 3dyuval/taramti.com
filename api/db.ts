import { default as Surreal } from 'surrealdb.js'
import mada from './mada'
import type { Row } from '../src/types'
import { getDates } from '../src/helpers/getDates'
import { getAddress } from '../src/helpers/getAddress'

export let db: Surreal

export class DB extends Surreal {
  constructor() {
    super()
    this.init()
  }

  async init() {
    if (db) {
      throw new Error('New instance cannot be created!!')
    }
    db = this

    const ns = process.env['SURREAL_NAMESPACE']
    const dbname = process.env['SURREAL_DB']
    const user = process.env['SURREAL_USER']
    const pass = process.env['SURREAL_PASS']
    const url = process.env['DB_URL']

    await this.connect(url)
    await this.signin({ user, pass })
    await this.use({ ns, db: dbname })
    console.log(`connected to db at ${url}`)
  }

  async seed() {
    try {
      const donationLocations = new Map<
        string,
        Row & { timeOpen: string; timeClose: string }
      >()
      const addresses = new Set<Record<string, string>>()

      const { Result, Success } = await fetch(mada()).then((res) => res.json())

      if (Success) {
        for (let rec of JSON.parse(Result) as Row[]) {
          const [timeOpen, timeClose] = getDates(rec).map((date) =>
            date.toISOString(),
          )

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
              ...rec,
            })
          }
        }
      }

      for (const [name, rec] of donationLocations.entries()) {
        addresses.add({
          name,
          city: !rec?.City || rec.City === '' ? null : rec.City,
          street: !rec?.Street || rec.Street === '' ? null : rec.Street,
          number: !rec?.NumHouse || rec.NumHouse === '' ? null : rec.NumHouse,
        })
      }

      console.log(
        `trying to populate 'addresses' with '${addresses.length}' records`,
      )

      const addressResult = await this.insert(
        'addresses',
        Array.from(addresses),
      )

      console.log(`successully written '${addressResult.length}' records`)
      console.log(
        `trying to populate 'donationLocation' with '${donationLocations.length}' records`,
      )
      const donationLocationsResult = await this.insert(
        'donationLocation',
        addressResult.map(({ id, name }) => {
          const rec = donationLocations.get(name)
          return {
            name,
            address: id,
            timeOpen: rec?.timeOpen,
            timeClose: rec?.timeClose,
          }
        }),
      )
      console.log(
        `successully written '${donationLocationsResult.length}' records`,
      )
      await this.close()
      console.log('connection closed')
    } catch (e) {
      console.error('ERROR', e)
    }
  }
}
