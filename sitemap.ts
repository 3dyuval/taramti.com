import { SitemapStream, streamToPromise } from 'sitemap'
import fs from 'fs/promises'
import { Readable } from 'stream'

type Options = {
  outDir: string
  hostname: string
  links: Array<{
    url: string
    links?: Array<{
      lang: string
      url: string
    }>
  }>
}

export const sitemap = (options: Partial<Options> = {}) =>  {
  return {
    name: 'sitemap',
    apply: 'build',
    closeBundle() {
      return streamToPromise(Readable.from(
        options.links.map((link) => {
          return {
          ...link, url: options.hostname + link.url
        }
    })
      ).pipe(new SitemapStream({ hostname: options.hostname })))
        .then((data) =>
         fs.writeFile(options.outDir + '/sitemap.xml', data.toString(), { encoding: 'utf-8' })
      ).then(() =>
        fs.writeFile(options.outDir + '/robots.txt', `User-agent: *\nSitemap: https://${options.hostname}/robots.txt`, { encoding: 'utf-8' })
      ).then(() => void console.log('sitemap.xml and robots.txt generated'))
        .catch((error) => { throw new Error(`sitemap/robots could not be generated`)})
    },
    transformIndexHtml() {
      return [
        {
          tag: 'link',
          injectTo: 'head' as 'head' | 'body' | 'head-prepend' | 'body-prepend' | undefined,
          attrs: {
            rel: 'sitemap',
            type: 'application/xml',
            title: 'Sitemap',
            href: '/sitemap.xml',
          },
        },
      ]
  }
}
}
