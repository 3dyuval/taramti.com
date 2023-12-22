import { PageContextServer } from '@/types'

export const passToClient = ['pageProps']

export async function onBeforeRender(pageContext: PageContextServer) {

  const key = import.meta.env['VITE_PEXELS_API_KEY']
  let photos = []

  const query = 'blood donation'

  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: key
    }
  }).then(res => res.json())
    .catch(console.error)


  if (response.photos) {
    photos = response?.photos.map(photo => photo.src.landscape)
  }


  return {
    pageContext: {
      pageProps: {
        photos,
        locations: await pageContext.db.getLocations()
      }
    }
  }
}