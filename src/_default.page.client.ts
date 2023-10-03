export { render }

import { createPageApp } from './page'
import type { PageContextClient } from '@/types'

async function render(pageContext: PageContextClient) {

  const instance = createPageApp(pageContext,
    document.getElementById('#app')?.innerHTML === ''
  )

  instance.store.state.value = [123]   // todo; get items from request cookie


  instance.page.mount('#app')
}
