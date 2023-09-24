export { onBeforeRender }
import { PageContext } from '@/types'
import { getData } from '../api'
import { getMada } from '../api/mada'


async function onBeforeRender(pageContext: PageContext) {
  const rows = await getData(getMada).catch(e => {
    console.error(e)
    return []
  })

  return {
    pageContext: {
      pageProps: {
        rows,
      },
    },
  }
}
