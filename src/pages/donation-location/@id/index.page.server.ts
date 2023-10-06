import { Coords, PageContext, PageProps, Row } from '@/types'
import * as api from '@/../api'
import { render } from 'vike/abort'
import { getAddress } from '@/helpers/getAddress'

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

export async function onBeforeRender(ctx: PageContext) {
  async function getLocationFromId(rows: Row[], id?: number): Promise<Row> {
    const row = rows.find((row) => row.id === id)

    if (!id || !row) {
      return Promise.reject(Errors.MISSING_ROW_DATA)
    }

    return Promise.resolve(row)
  }

  async function getCoordsFromGoogleMaps(
    row: Row
  ): Promise<Coords | undefined> {
    const key = import.meta.env.VITE_GOOGLE_MAP_API_KEY

    if (!key) {
      return Promise.reject('No Google Maps API key found')
    }

    const googleGeocoding = new Request(
      `https://maps.googleapis.com/maps/api/geocode/json?&key=${
        import.meta.env.VITE_GOOGLE_MAP_API_KEY
      }&address=${getAddress(row)}`
    )

    return fetch(googleGeocoding)
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
        console.error(error)
        throw new Error(Errors.RESPONSE_NOT_VALID)
      })
  }

  try {
    const id = Number(ctx.routeParams?.id)

    if (!id) {
      throw `Id "${id}" was not specified`
    }

    const rows = await api.getData()
    const row = await getLocationFromId(rows, id)
    const coords = await getCoordsFromGoogleMaps(row)

    return {
      pageContext: {
        pageProps: {
          row,
          rows,
          coords,
        },
      },
    }
  } catch (error) {

    console.error(`Error at: ${ctx.urlPathname}`, error)

      throw render(404)

  }
}
