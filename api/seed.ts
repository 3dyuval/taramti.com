import { DB } from './db'
import { getData } from './index'

async function seed() {
  const db = new DB()
  await db.init()
  await getData()
}

seed().catch(console.error)
