import { PageContextServer } from '@/types'
import { render } from 'vike/abort'

export { guard }


 function guard(pageContext: PageContextServer) {

  if (!pageContext.urlOriginal.startsWith('/' + pageContext.locale)) {
    throw render(404, 'Page is not available in your country')
  }


}

