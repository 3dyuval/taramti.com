import { PageContext } from '@/types'
import { db } from '../api/db'

export { onBeforeRender }


async function onBeforeRender(pageContext?: PageContext) {
  const data = await db.query('SELECT *, address.* FROM donationLocation WHERE time::now() < timeClose;')


  return {
    pageContext: {
      pageProps: {
        rows: data[0].result
      }
    }
  }
}
