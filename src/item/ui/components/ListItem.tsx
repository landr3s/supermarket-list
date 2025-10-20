import { useState } from 'react'
import type { Item } from '../../item'
import Button from '../controls/button'
import styles from './ListItem.module.scss'

interface ListItemProps {
  item: Item
  onRemove: (id: Item['id']) => Promise<void>
}

export default function ListItem({ item, onRemove }: ListItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await onRemove(item.id)
    } catch (error) {
      console.error('Error removing item:', error)
      setIsRemoving(false)
    }
  }

  return (
    <li className={`${styles.listItem} ${isRemoving ? styles.removing : ''}`}>
      <span className={styles.itemText}>{item.title}</span>
      <Button
        onClick={handleRemove}
        disabled={isRemoving}
        colorScheme="secondary"
        className={styles.deleteButton}
      >
        {isRemoving ? 'Eliminando...' : 'Eliminar'}
      </Button>
    </li>
  )
}