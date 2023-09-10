import fs from 'fs/promises'
import * as path from 'path'
import type { Row } from '@/@types'
import mada from './mada'

export async function getData(): Promise<any> {
    const now = new Date()
    const fileName = now.getDate() + '.' + (now.getUTCMonth() + 1) + '.' + now.getFullYear() + '.' + 'json'
    const fileLocation = path.resolve(process.cwd(), 'api', 'data', fileName)
    let data = await fs
        .stat(fileLocation)
        .then((stat) => {
            if (stat.isFile()) {
                console.log(`${fileName}" was found`)
                return fs.readFile(fileLocation, 'utf8')
            }
        })
        .catch((e) => {
            console.log(`File "${fileName}" not found. Fetching new file`)
            return ''
        })

    if (data === '') {
        data = await fetch(mada())
            .then(async (response) => {
                const { Success, Result } = await response.json()
                if (Success) {
                    console.log(`Received JSON data. Saving new file "${fileName}"`)
                    fs.writeFile(fileLocation, Result, 'utf8')
                    return Result
                }
            })
            .catch((e) => {
                console.error('No data')
            })
    }

    function addId(row: Row, id: number): Row {
        return {
            ...row,
            id,
        }
    }

    if (data) {
        return JSON.parse(data).map(addId)
    }

    return Promise.reject('No data was fetched')


}
