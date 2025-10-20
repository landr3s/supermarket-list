import { useEffect, useState } from 'react'
import './App.css'
import type { Item } from './item/item'
import api from './item/api'
import Modal, { ModalFooter } from './item/ui/controls/Modal'
import Button from './item/ui/controls/button'
import TextField from './item/ui/input'
import { List } from './item/ui/components'

const State = {
  Init: 'init',
  Loading: 'loading',
  Success: 'success'
}

type State = (typeof State)[keyof typeof State]

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [state, setState] = useState<State>(State.Init)
  const [isModalVisible, toggleModal] = useState<boolean>(false)
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false)
  
  useEffect(() => {
    const loadItems = async () => {
      try {
        setState(State.Loading)
        const loadedItems = await api.list()
        setItems(loadedItems)
        setState(State.Success)
      } catch (error) {
        console.error('Error loading items:', error)
        setState(State.Success)
      }
    }
    
    loadItems()
  }, [])

  const remove = async (id: Item['id']) => {
    try {
      await api.remove(id)
      setItems((items) => items.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = (formData.get('text') as string)?.trim()

    if (!text) return

    setIsAddingItem(true)
    try {
      const newItem = await api.add(text)
      setItems((items) => items.concat(newItem))
      toggleModal(false)
      // Reset form
      event.currentTarget.reset()
    } catch (error) {
      console.error('Error adding item:', error)
    } finally {
      setIsAddingItem(false)
    }
  }

  if (state === State.Init || state === State.Loading) {
    return (
      <div>
        <header>
          <h1>Supermarket List</h1>
          <h3>Cargando...</h3>
        </header>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <span>Cargando elementos...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header>
        <h1>Supermarket List</h1>
        <h3>{items.length} elemento{items.length !== 1 ? 's' : ''}</h3>
      </header>
      
      <List 
        items={items} 
        onRemove={remove}
        isLoading={state === State.Loading}
      />
      
      <Button
        onClick={() => toggleModal(true)}
        colorScheme='primary'
        disabled={isAddingItem}
      >
        {isAddingItem ? 'Agregando...' : 'Agregar Elemento'}
      </Button>
      
      {isModalVisible && (
        <Modal onClose={() => !isAddingItem && toggleModal(false)}>
          <form onSubmit={handleSubmit}>
            <h3>Agregar Elemento</h3>
            <TextField 
              name='text' 
              placeholder='Nombre del producto'
              disabled={isAddingItem}
            />
            <ModalFooter>
              <Button 
                type='button' 
                onClick={() => toggleModal(false)}
                disabled={isAddingItem}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                colorScheme='primary'
                disabled={isAddingItem}
              >
                {isAddingItem ? 'Agregando...' : 'Agregar'}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default App
