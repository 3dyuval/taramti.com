import { PageContext } from '@/types'
import { db } from '../api'

export { onBeforeRender }


async function onBeforeRender(pageContext: PageContext) {


  return {
    pageContext: {
      pageProps: {
        rows: await db.getRows()
      }
    }
  }
}
