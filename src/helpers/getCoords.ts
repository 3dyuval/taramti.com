import { Coords } from '@/types'
import Jsoning from 'jsoning'
import { safeName } from '@/helpers/safeName'

const store = new Jsoning('.coords.json')

async function getCoordsFromGoogleMaps(
  address: string = ''
): Promise<Coords | undefined> {

  return new Promise(async (resolve, reject) => {
    address = safeName(address)

    if (!address) {
      reject('No address')
    }

    let coords = store.get(address)

    if (coords) {
      resolve(JSON.parse(coords))
    }
    const key = import.meta.env.VITE_GOOGLE_MAP_API_KEY

    if (!key) {
      return Promise.reject('No Google Maps API key found')
    }


    coords = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?&key=${key}&address=${address}`)
      .then(async (response) => {
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
        if (coords) {
          store.set(address, JSON.stringify(coords)).catch(e => reject(`could not save to file: ${e.message}`))
          resolve(coords)
        }

        reject('Missing response from Google Maps API')

      })

  })
}