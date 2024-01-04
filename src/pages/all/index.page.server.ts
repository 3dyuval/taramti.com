import { Coords, PageContext, PageProps } from '@/types'
import { redirect, render } from 'vike/abort'
import { getCoordsFromGoogleMaps } from '@/helpers/getCoords'

export const passToClient = ['pageProps', 'routeParams']

export async function onBeforeRender(pageContext: PageContext) {

  const locations = await pageContext.db.getLocations()


  locations.forEach(location => {
    const coords = getCoordsFromGoogleMaps(location.donationLocation.address.fullAddress).catch(console.error)
  })

  return {
    pageContext: {
      pageProps: {
        locations: await pageContext.db.getLocations()
      }
    }
  }

}
