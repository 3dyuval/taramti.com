import { Coords, PageContext, PageProps } from '@/types'
import { redirect, render } from 'vike/abort'
import { getAddress } from '@/helpers/getAddress'
import { getCoordsFromGoogleMaps } from '@/helpers/getCoords'
export const passToClient = ['pageProps', 'routeParams']

enum Errors {
  MISSING_RESPONSE = 'Missing response from Google Maps API',
  RESPONSE_NOT_VALID = 'Response is not valid JSON',
}

export function getDocumentProps(pageProps: PageProps) {
  const address = getAddress(pageProps.location!)
  const title = `תרומת דם ב"${pageProps.location?.donationLocation.name}"`
  return { title, description: address, address }
}

export async function onBeforeRender(pageContext: PageContext) {

  try {
    function decodeSlash(str: string) {
      return str.replace(new RegExp(encodeURIComponent('/'), 'g'), '/')
    }

    const locationName = pageContext.routeParams.location

    if (!locationName) {
      throw redirect('/')
    }

    const location = await pageContext.db.getLocationByName(
      decodeSlash(locationName)
    )

    if (!location) {
      throw render(404)
    }

    const coords = await getCoordsFromGoogleMaps(getAddress(location))

    return {
      pageContext: {
        pageProps: {
          locations: await pageContext.db.getLocations(),
          location,
          coords
        }
      }
    }
  } catch (error) {
    console.error(`Error at: ${pageContext.urlPathname}`, error)

    if (error === Errors.MISSING_RESPONSE) {
      throw render(404)
    } else {
      throw render(500)
    }

  }
}
