import { Coords } from '../types'
import { safeName } from './safeName'
import { hfs } from '@humanfs/node'
import path from 'path'

const FILE_PATH = path.resolve('src', 'assets', 'coords.json')

export async function getCoordsFromGoogleMaps(
  address: string = ''
): Promise<Coords | void> {
  return new Promise(async (resolve, reject) => {

    address = safeName(address)

    if (!address) {
      reject('No address')
    }

    // HAPPY PATH

    let coords = await hfs.json(FILE_PATH)
      .catch(() => {
      })

    if (coords && coords[address]) {
      resolve(coords[address])
    }


    // GET COORDS FROM GOOGLE MAPS API

    const googleApiKey = import.meta.env['VITE_GOOGLE_MAP_API_KEY']

    if (!googleApiKey) {
      return Promise.reject('No Google Maps API key found')
    }


    const newCoords = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?&key=${googleApiKey}&address=${address}`
    ).then(async (response) => {
        const results = (await response.json()).results
        if (results.length) {
          for (const result of results) {
            if (
              result.geometry &&
              typeof result.geometry.location.lat === 'number' &&
              typeof result.geometry.location.lng === 'number'
            ) {
              return result.geometry.location as Coords
            }
          }
        }

    }).catch(error => {
      console.error(error.error_message)
    })

    if (newCoords) {

      await hfs.write(
        FILE_PATH,
        JSON.stringify(
          { ...coords, [address]: newCoords },
          null, 2)
      ).catch(e => reject(`could not save to file: ${e.message}`))

      resolve(newCoords)
    } else {
      reject('Missing response from Google Maps API')

    }

  })
}
