  import { createPageApp } from './page'
import type { PageContextClient } from '@/types'

export { render }

async function render(pageContext: PageContextClient) {
  const instance = createPageApp(
    pageContext,
    document.getElementById('#app')?.innerHTML === '',
  )

  instance.page.mount('#app')
}
