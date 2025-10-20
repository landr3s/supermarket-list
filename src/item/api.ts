import type { Item } from './item'

const MOCK = [
  { id: 1, title: 'Pejelagarto icream' },
  { id: 2, title: 'Pejelagarto sandwitch' },
  { id: 3, title: 'Pejelagarto apple' }
]

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  remove: (id: Item['id']) => Promise.resolve(id),
  add: (title: Item['title']) => Promise.resolve({ title, id: +new Date() })
}
