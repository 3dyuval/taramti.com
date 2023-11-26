import type { DonationLocation } from '../api'
import type {
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  PageContextBuiltInServer
} from 'vike/types'
import type { ComponentPublicInstance } from 'vue'

export type Coords = {
  lat: string;
  lng: string
}
export type DonationLocationDate = {
  dateOpen: string
  dateClose: string
  donationLocation: {
    name: string;
    schedulingUrl: string;
    address: {
      city: string | null;
      street: string | null;
      number: string | null;
    }
  }
}


export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }
export type { Component }

type Component = ComponentPublicInstance // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type Page = Component
type PageProps = {
  rows: DonationLocation[],
  row?: DonationLocation,
  coords?: Coords,
  error?: string
}

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    getDocumentProps?: (pageProps: PageProps) => {
      title?: string;
      description: string
    };
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer