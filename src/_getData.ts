import { PageContext } from '@/types'

export { onBeforeRender }


async function onBeforeRender(pageContext: PageContext) {


  return {
    pageContext: {
      pageProps: {
        rows: await pageContext.db.getRows() || []
      }
    }
  }
}
