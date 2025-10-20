import styles from './TextField.module.css'

function TextField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type='text'
      {...props}
      className={styles.container}
    />
  )
}

export default TextField
