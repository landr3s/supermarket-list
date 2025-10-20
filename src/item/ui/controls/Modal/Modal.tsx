import styles from './Modal.module.scss'

interface Props {
  onClose: VoidFunction
  children: React.ReactNode
}

function Modal({ children, onClose }: Props) {
  return (
    <section className={styles.container}>
      <b onClick={onClose}></b>
      <article>{children}</article>
    </section>
  )
}

export default Modal
