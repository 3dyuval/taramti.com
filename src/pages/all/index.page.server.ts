import { Coords, PageContext, PageProps } from '@/types'
import { redirect, render } from 'vike/abort'
import coords from '../../assets/coords.json'
export const passToClient = ['pageProps', 'routeParams']

export async function onBeforeRender(pageContext: PageContext) {

  const locations = await pageContext.db.getLocations()

  return {
    pageContext: {
      pageProps: {
        locations: coords
      }
    }
  }

}
