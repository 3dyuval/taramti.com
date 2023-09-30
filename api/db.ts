import { default as Surreal } from 'surrealdb.js';
import mada from './mada'
import type { Row } from '../src/types'
import { getAddress } from '../src/helpers/getAddress'
import { getDates } from '../src/helpers/getDates'
console.log('instanciating db class')
export const db = new Surreal();

console.log('trying to connect to db')

try {
    // Connect to the database
    await db.connect('http://127.0.0.1:8000/rpc')

    await db.use({  ns: 'test', db: 'test' })

    // Signin as a namespace, database, or root user
    await db.signin({
        user: 'root',
        pass: 'root',
    });
    
    await db.wait()

    console.log('connected to db at localhost:8000')

    const places: any = []
    await fetch(mada())
        .then(async (response) => {
            const { Success, Result } = await response.json()

            if (Success) {
                for (let rec of JSON.parse(Result) as Row[]) {
                    const [openingDate, closingDate] = getDates(rec).map(date => date.toISOString())
                    const place = {
                        createdAt: "time::now()",
                        name: rec.Name,
                        address: getAddress(rec),
                        openingDate: `time::(${openingDate})`,
                        closingDate: `time::(${closingDate})`
                    }

                    places.push(place)

                }
            }
        })
    console.log(`trying to insert ${places.length} records`)

    const r = await db.create("place", places)
    console.log('successully writen to db', r)
    await db.close()
    console.log('connection closed')
} catch (e) {

    console.error('ERROR', e);

}



