import { PageContextServer } from '@/types'
import { render } from 'vike/abort'

export { onBeforeRoute }


function onBeforeRoute(pageContext: PageContextServer) {

  if (pageContext.urlOriginal.startsWith('/' + pageContext.locale)) {
    return {
      pageContext: {
        urlOriginal: pageContext.urlOriginal.replace(`/${pageContext.locale}`, '')
      }
    }
  } else {
    throw render(500)
  }


}

