import { useEffect, useState } from 'react'
import './App.css'
import type { Item } from './item/item'
import api from './item/api'

const State = {
  Init: 'init',
  Success: 'success'
}
import Modal, { ModalFooter } from './item/ui/controls/Modal'
import Button from './item/ui/controls/button'
import TextField from './item/ui/input'

type State = (typeof State)[keyof typeof State]

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [state, setState] = useState<State>(State.Init)
  const [isModalVisible, toggleModal] = useState<boolean>(false)
  useEffect(() => {
    api.list().then((items) => setItems(items))
    setState(State.Success)
  }, [])

  const remove = (id: Item['id']) => {
    api
      .remove(id)
      .then(() => setItems((items) => items.filter((item) => item.id !== id)))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = event.currentTarget.text.value.trim()

    if (!text) return

    api.add(text).then((item) => setItems((items) => items.concat(item)))
    toggleModal(false)
  }

  if (state === State.Init) return <span>Loading...</span>

  return (
    <div>
      <header>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
      </header>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} <button onClick={() => remove(item.id)}>delete</button>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => toggleModal(true)}
        colorScheme='primary'
      >
        Add Item
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={handleSubmit}>
            <h3>Add Item</h3>
            <TextField name='text' />
            <ModalFooter>
              <Button type='button'>Cancel</Button>
              <Button
                type='submit'
                colorScheme='primary'
              >
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default App
