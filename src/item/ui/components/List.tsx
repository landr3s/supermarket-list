import type { Item } from '../../item'
import ListItem from './ListItem'
import styles from './List.module.scss'

interface ListProps {
  items: Item[]
  onRemove: (id: Item['id']) => Promise<void>
  isLoading?: boolean
}

export default function List({ items, onRemove, isLoading = false }: ListProps) {
  if (items.length === 0 && !isLoading) {
    return (
      <div className={styles.emptyState}>
        No hay elementos en la lista. ¡Agrega el primero!
      </div>
    )
  }

  return (
    <ul className={`${styles.list} ${isLoading ? styles.loading : ''}`}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}