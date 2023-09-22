export { onBeforeRender }
import { PageContext } from '@/types'
import { getData } from '../api'


async function onBeforeRender(pageContext: PageContext) {
  const rows = await getData().catch(e => {
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
