import type { IStorage } from '../../server/repository'

export class CookieStorage implements IStorage {

  private repository: Set<number[]> = new Set()

  constructor() {
  }

  parseCookies(cookie: string): Set<number[]> {
    const items = new Set()
    cookie && cookie.split(';')
      .forEach((cookie) => {
        const parts = cookie.split('=')
        items.add(decodeURI(parts[1]))
      })
    return items
  }

  save(value): void {
    document.cookie = encodeURI(`heart=${value.join(';')}`)
  }

  addItem(key: number): void {
    this.repository = this.store.add(key)
    this.save()
  }

  removeItem(key: number): void {
    this.repository = this.store.delete(key)
    this.save()
  }

  get items(): number[] {
    return this.repository.values()
  }

  set items(value: number[]) {
    this.repository = new Set(value)
    this.save()
  }

}