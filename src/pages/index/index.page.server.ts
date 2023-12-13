import { PageContextServer } from '@/types'
import { render } from 'vike/abort'

export async function onBeforeRender(pageContext: PageContextServer) {


  return {
    pageContext: {
      pageProps: {
        locations: await pageContext.db.getLocations()
          .catch((error) => {
            console.error(error)
            throw render(500)
          })
      }
    }
  }
}