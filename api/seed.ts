import { DB, db } from './db'

async function seed() {
  new DB()
  await db.seed()
  console.log('seeded')
}

seed().catch((err) => console.error('Error running seed', err))
