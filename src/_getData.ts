import { PageContext } from '@/types'
import { getRows } from '../api'

export { onBeforeRender }


async function onBeforeRender(pageContext: PageContext) {


  return {
    pageContext: {
      pageProps: {
        rows: await getRows()
      }
    }
  }
}
