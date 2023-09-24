import fs from 'fs/promises'
import * as path from 'path'
import type { Row } from '@/types'
import { findById } from './findById'
import * as O from 'fp-ts/Option'

export type Getter<T> = {
  fetchFunction: () => O.Option<T>,
  fileName: (args: any) => string,
}

export async function getData(args: Getter, id?: number): Promise<any> {
  const { fileName } = args

  const fileLocation = path.resolve(process.cwd(), 'api', 'data', fileName)
  let data = await fs
    .stat(fileLocation)
    .then((stat) => {
      if (stat.isFile()) {
        console.log(`"${fileName}" was found`)
        return JSON.stringify(fs.readFile(fileLocation, 'utf8'))
      }
    })
    .catch((e) => {
      console.log(`File "${fileName}" not found. Fetching new file`)
      return ''
    })

  if (data === '') {
    data = await args
      .fetchFunction()
        .then((result: any) => {
            if (typeof result === 'string') {
                result = result ? JSON.parse(result) : []
            }
        const dataWithUniqueIds = Array.from(result).map((i, index) => ({ ...i, id: index }))
        console.log(`Received JSON data. Saving new file "${fileName}"`)
        fs.writeFile(fileLocation, JSON.stringify(dataWithUniqueIds), 'utf8')
        return dataWithUniqueIds
      })
      .catch((e) => {
        console.error('No data')
      })
  }

  if (id) {
    return findById(data, id)
  }

  return data || Promise.reject('No data was fetched')
}

export default {
  getData,
}
