import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <img src="/logo.png" alt="Course logo" />
      <p>
        <Link href="/about">About us</Link>
      </p>
    </main>
  )
}
