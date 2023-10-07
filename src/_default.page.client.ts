export { render }

import { createPageApp } from './page'
import type { PageContextClient } from '@/types'

async function render(pageContext: PageContextClient) {
  const instance = createPageApp(
    pageContext,
    document.getElementById('#app')?.innerHTML === '',
  )

  instance.page.mount('#app')
}
