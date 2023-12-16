import { PageContextServer } from '@/types'

export async function onBeforeRender(pageContext: PageContextServer) {


  return {
    pageContext: {
      pageProps: {
        locations: await pageContext.db.getLocations()
        // .catch((error: Error) => {
        //   console.error(error)
        //   throw render(500)
        // })
      }
    }
  }
}