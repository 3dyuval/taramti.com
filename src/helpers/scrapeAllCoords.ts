import locations from '../assets/data.json'
import { Coords } from '@/types'
import path from 'path'
import { hfs } from '@humanfs/node'

let results = {}

const FILE_PATH = path.resolve('src', 'assets', 'coords.json')


function getCoordsFromGoogleMaps(address: string) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyDUVVagh2-2-yH5oJWOHzA_Flkk_hmNdXM&address=${address}`
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
}

async function scrapeAllCoords() {
  for (const address of locations) {
    await getCoordsFromGoogleMaps(`${address.Name} ${address.City} ${address.Street} ${address.NumHouse}`)
      .then((result) => {
        let results = { ...results }
      })
      .catch(console.error)
  }
  return results
}

scrapeAllCoords().then((all) => {
  console.log(all)
  hfs.write(
    FILE_PATH,
    JSON.stringify(all, null, 2)
  ).catch(console.error)

})