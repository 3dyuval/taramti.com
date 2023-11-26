import { getRows } from './index'
import { DB, db } from './db'

export async function seed() {
  new DB()
  await db.init()
  await getRows().then(console.log).catch(console.error)
}

seed()
