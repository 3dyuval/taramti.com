export { render }

import { createPageApp } from './page'
import type { PageContextClient } from '@/types'

async function render(pageContext: PageContextClient) {

  const page = createPageApp(pageContext,
    document.getElementById("#app")?.innerHTML === ''
  )
  
  page.mount('#app')
}
