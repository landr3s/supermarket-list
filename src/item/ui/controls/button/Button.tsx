import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'secondary' | 'primary'
  children: React.ReactNode
}

function Button({ children, colorScheme = 'secondary', ...props }: Props) {
  return (
    <button
      className={`${styles.container} ${styles[colorScheme]} `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
