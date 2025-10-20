import type { Item } from './item'

// Función para simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Función para transformar productos de JSONPlaceholder a nuestro formato
const transformProduct = (product: any): Item => ({
  id: product.id,
  title: product.title
})

// LocalStorage helpers
const STORAGE_KEY = 'supermarket-list-items'

const saveToLocalStorage = (items: Item[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const loadFromLocalStorage = (): Item[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const isFirstLoad = () => {
  return !localStorage.getItem(STORAGE_KEY)
}

export default {
  list: async (): Promise<Item[]> => {
    await delay(800) // Simular delay de red
    
    // Si es la primera vez, cargar datos de JSONPlaceholder
    if (isFirstLoad()) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        const products = await response.json()
        const items = products.map(transformProduct)
        saveToLocalStorage(items)
        return items
      } catch (error) {
        console.error('Error fetching from API:', error)
        // Fallback a datos mock si falla la API
        const mockItems = [
          { id: 1, title: 'Manzanas' },
          { id: 2, title: 'Leche' },
          { id: 3, title: 'Pan' }
        ]
        saveToLocalStorage(mockItems)
        return mockItems
      }
    }
    
    // Cargar datos del localStorage
    return loadFromLocalStorage()
  },
  
  remove: async (id: Item['id']): Promise<void> => {
    await delay(600) // Simular delay de operación
    const items = loadFromLocalStorage()
    const filteredItems = items.filter(item => item.id !== id)
    saveToLocalStorage(filteredItems)
  },
  
  add: async (title: Item['title']): Promise<Item> => {
    await delay(700) // Simular delay de operación
    const items = loadFromLocalStorage()
    const newItem: Item = {
      id: Date.now(), // Usar timestamp como ID único
      title
    }
    const updatedItems = [...items, newItem]
    saveToLocalStorage(updatedItems)
    return newItem
  }
}
