import { Coords, PageContext, Row } from '@/types'
import { getData } from '../../../../api'

export async function onBeforeRender(ctx: PageContext) {



  async function getLocationFromId(rows?: Row[], id?: number): Promise<Row> {

    const row = (rows || []).find((row) => row.id === Number(id))

    if (!id || !row || !row.City) {
      return Promise.reject('Missing row data to get location')
    }

    return Promise.resolve(row)
  }

  async function getCoordsFromGoogleMaps(row: Row): Promise<Coords> {
    const googleGeocoding = new Request(
      `https://maps.googleapis.com/maps/api/geocode/json?&key=${
        import.meta.env.VITE_GOOGLE_MAP_API_KEY
      }&address=${row.City}%${row.Street}%${row.NumHouse}%${row.Name}`
    )

    const data = await fetch(googleGeocoding)
      .catch((error) => {
        console.error(error)
        throw 'Missing response from Google Maps API'
      })
      .then(async (response) => response.json())
      .catch((error) => {
        console.error(error)
        throw 'Response is not valid JSON'
      })

    return Promise.resolve(data.results[0].geometry.location)
  }

  try {
    const id = ctx.routeParams.id
    const rows = await getData()
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
    return {
      pageContext: {
        pageProps: {
          error,
        },
      },
    }
  }
}
