import { default as Surreal } from 'surrealdb.js'
import dotenv from 'dotenv'

dotenv.config()

export let db: Surreal

export class DB extends Surreal {


  constructor() {
    super()
    return db = this
  }

  async init() {
    // if (db) {
    //   console.warn('New instance cannot be created')
    //   return
    // }

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

}

