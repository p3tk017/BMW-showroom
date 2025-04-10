import Link from 'next/link'
import styles from '../styles/Header.module.css'
import { useAuth } from '@/context/AuthContext'

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>BMW Showroom</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {!isAuthenticated ? (
          <>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
          ): (
            <li>
              <a onClick={logout} className='logout-btn'>Logout</a>
            </li>  
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header