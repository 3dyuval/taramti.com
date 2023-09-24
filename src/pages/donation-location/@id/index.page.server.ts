import { Coords, PageContext, PageProps, Row} from '@/types'
import * as api from 'api'
import { redirect } from 'vite-plugin-ssr/abort'
import { render } from 'vite-plugin-ssr/abort'

export const passToClient = ['pageProps', 'routeParams']

enum Errors {
  MISSING_ROW_DATA = 'Missing row data to get location',
  MISSING_RESPONSE = 'Missing response from Google Maps API',
  RESPONSE_NOT_VALID = 'Response is not valid JSON',
}

export function getDocumentProps(pageProps: PageProps) {
  const address = `${pageProps.row?.City}, ${pageProps.row?.Street} ${pageProps.row?.NumHouse}`
  const title = `תרומת דם  ב"${pageProps.row?.Name || address}"`
  return { title, description: address }
}

export async function onBeforeRender(ctx: PageContext) {
  async function getLocationFromId(rows?: Row[], id?: number): Promise<Row> {
    const row = (rows || []).find((row) => row.id === id)

    if (!id || !row) {
      return Promise.reject(Errors.MISSING_ROW_DATA)
    }

    return Promise.resolve(row)
  }

  async function getCoordsFromGoogleMaps(
    row: Row
  ): Promise<Coords | undefined> {
    const googleGeocoding = new Request(
      `https://maps.googleapis.com/maps/api/geocode/json?&key=${
        import.meta.env.VITE_GOOGLE_MAP_API_KEY
      }&address=${row.City}%${row.Street}%${row.NumHouse}%${row.Name}`
    )

    return fetch(googleGeocoding)
      .catch((error) => {
        console.error(error)
        throw new Error(Errors.MISSING_RESPONSE)
      })
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
      throw render(404)
    }

    const rows = await api.getData()
    const row = await getLocationFromId(rows, id)
    const coords = await getCoordsFromGoogleMaps(row)

    return {
      pageContext: {
        pageProps: {
          row,
          coords,
        },
      },
    }
  } catch (error) {
    const id = Number(ctx.routeParams?.id)

    if (error === Errors.MISSING_ROW_DATA) {
      throw render(404)
    }

    if (error === Errors.MISSING_RESPONSE) {
      throw redirect(`/?location=${id}?error=${error}`)
    }

    if (error === Errors.RESPONSE_NOT_VALID) {
      throw redirect(`/?location=${id}?error=${error}`)
    }
  }
}
