import { default as Surreal } from 'surrealdb.js';
import mada from './mada'
import type { Row } from '../src/types'
import { getAddress } from '../src/helpers/getAddress'
import { getDates } from '../src/helpers/getDates'


export class db extends Surreal {

    super() {
        this.init()
    }

    async init({ ns = 'test', db = 'test', user = 'root', pass = 'pass' } = {},
    url = "http://localhost:8080") {
        await this.signin({ ns, db, user, pass });
        await this.connect(url)
        await this.wait()
        console.log('connected to db at ' + url)
    }

    async seed() {
        try {

            const places: any = []
            await fetch(mada())
                .then(async (response) => {
                    const { Success, Result } = await response.json()

                    if (Success) {
                        for (let rec of JSON.parse(Result) as Row[]) {
                            const [openingDate, closingDate] = getDates(rec).map(date => date.toISOString())
                            const place = {
                                createdAt: new Date().toISOString(),
                                name: rec.Name,
                                address: getAddress(rec),
                                openingDate,
                                closingDate
                            }

                            places.push(place)
                        }
                    }
                })

            console.log(`trying to insert ${places.length} records`)

            const r = await this.insert("place", places)
            console.log('successully writen to db', r)
            await this.close()
            console.log('connection closed')
        } catch (e) {

            console.error('ERROR', e);

        }
    }





}
