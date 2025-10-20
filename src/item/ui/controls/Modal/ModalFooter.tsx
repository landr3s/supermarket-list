import styles from './ModalFooter.module.scss'
interface Props {
  children: React.ReactNode
}

function ModalFooter({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}

export default ModalFooter
