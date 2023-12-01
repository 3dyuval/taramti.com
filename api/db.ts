import { default as Surreal } from 'surrealdb.js'
import dotenv from 'dotenv'
import madaRequest from './madaRequest'
import { getAddress } from '../src/helpers/getAddress'
import type { DonationLocationDate } from '../src/types'


export interface IDataBase extends Surreal {
  getData(): Promise<DonationLocationDate[]>

  saveData(dates: DonationLocationDate[]): Promise<DonationLocationDate[]>

  getRows(): Promise<DonationLocationDate[]>
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

export let db: Surreal

export class DB extends Surreal {

  constructor() {
    super()
    if (db) {
      console.warn('DB was already initialized')
    }
    return db = this
  }

  async init() {
    if (!db) {
      console.warn('DB was not initialized. Initializing now')
    }
    console.warn('Loading env variables')

    dotenv.config()

    const envVars = {
      ['namespace']: process.env['SURREAL_NAMESPACE']!,
      ['database']: process.env['SURREAL_DATABASE']!,
      ['username']: process.env['SURREAL_USERNAME']!,
      ['password']: process.env['SURREAL_PASSWORD']!,
      ['url']: process.env['SURREAL_URL']!
    }

    for (const [key, value] of Object.entries(envVars)) {
      if (value == undefined) {
        return Promise.reject(`Missing env variable "${key}"`)
      }
    }

    const { namespace, database, username, password, url } = envVars
    await this.connect(url!)
    await this.signin({ username, password })
    await this.use({ namespace, database })
    console.log(`Succesfully Connected DB at path ${url!}`)

  }

  async getData() {

    const { Result, Success } = await fetch(madaRequest()).then((res) => res.json())

    if (!Success) {
      return Promise.reject('No data was fetched')
    }

    const donationLocationDates = new Array<DonationLocationDate>()
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

  async saveData(dates: DonationLocationDate[]): Promise<DonationLocationDate[]> {

    console.log(
      `trying to save data with '${dates.length}' records`
    )

    const resultLocations = await this.insert('donationLocation', dates.map(({ donationLocation }) => donationLocation))

    await this.let('dates', dates.map(({ dateOpen, dateClose, donationLocation: { name } }, index) => {
      const donationLocationRecordId = String(resultLocations.find((location) => location.name === name)?.id)
      return {
        dateOpen,
        dateClose,
        donationLocation: donationLocationRecordId
      }
    }))

    const resultLocationDates = await this.query(`
      FOR $date IN $dates {
          CREATE donationLocationDates:[$date.dateOpen, $date.dateClose, $date.donationLocation] CONTENT {
              dateOpen: $date.dateOpen,
              dateClose: $date.dateClose,
              donationLocation: $date.donationLocation
          }
        }
        
    `)
    // const resultLocationDates = await this.insert('donationLocationDates', dateWithLocation)

    console.log(`successully saved '${resultLocations.length}' resultLocations records, and ${resultLocationDates.length} resultLocationDates records`)

    return dates
  }

  async getRows() {
    let [result] = await this.query(
      `SELECT  *, donationLocation.* FROM donationLocationDates WHERE time::floor(dateOpen, 1d) >= time::floor(time::now(), 1d);
    `)

    if (!result?.length) {
      const data = await this.getData()
      result = await this.saveData(data)
    }
    return result
  }

}

