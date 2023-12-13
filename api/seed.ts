import { DB, db } from './db'

export async function seed() {
  new DB()
  await db.init()
  await db.getRows().then(console.log).catch(console.error)
  process.exit(1)
}

seed()
