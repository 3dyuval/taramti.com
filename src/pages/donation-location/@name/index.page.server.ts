import { Coords, PageContext, PageProps } from '@/types'
import { render } from 'vike/abort'
import { getAddress } from '@/helpers/getAddress'
import { db } from '../../../../api/db'

export const passToClient = ['pageProps', 'routeParams']

enum Errors {
  MISSING_ROW_DATA = 'Missing row data to get location',
  MISSING_RESPONSE = 'Missing response from Google Maps API',
  RESPONSE_NOT_VALID = 'Response is not valid JSON',
}

export function getDocumentProps(pageProps: PageProps) {
  const address = getAddress(pageProps.row)
  const title = `תרומת דם ב "${pageProps.row?.Name || address}"`
  return { title, description: address }
}

export async function onBeforeRender(pageContext: PageContext) {


  async function getCoordsFromGoogleMaps(
    address: string
  ): Promise<Coords | undefined> {

    const key = import.meta.env.VITE_GOOGLE_MAP_API_KEY

    if (!key) {
      return Promise.reject('No Google Maps API key found')
    }


    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?&key=${key}&address=${address}`)
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
        } else {
          throw new Error(Errors.MISSING_RESPONSE)
        }
      })
      .catch((error) => {
        console.error(error?.error_message)
        throw new Error(Errors.RESPONSE_NOT_VALID)
      })
  }

  try {
    const name = decodeURI(pageContext.routeParams?.name)

    console.log(`fetching ${name} from url`)

    const [response] = await db.query(`
            SELECT *, donationLocation.* FROM donationLocationDates WHERE donationLocation.name == $name;
    `, {
      name
    })

    console.log(response.result[0].donationLocation)

    if (response.status !== 'OK' || !response.result?.length) {
      throw render(404)
    }

    const coords = await getCoordsFromGoogleMaps(getAddress(response.result[0].donationLocation.address))

    return {
      pageContext: {
        pageProps: {
          row: response.result[0],
          rows: [],
          coords
        }
      }
    }
  } catch (error) {
    console.error(`Error at: ${pageContext.urlPathname}`, error)

    throw render(404)

  }
}
