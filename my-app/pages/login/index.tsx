import Head from 'next/head'
import { useState } from 'react'
import styles from '../../styles/Login.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

const Login = (jwt?: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formStatus, setFormStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setFormStatus('Please fill in all fields.')
      return
    }

    setIsLoading(true)
    setFormStatus('')

    try {
      const res = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error?.message || 'Login failed')
      }

      login(data.jwt)
      // localStorage.setItem('user', JSON.stringify(data.user))

      setFormData({ email: '', password: '' })

      router.push('/')
    } catch (error: any) {
      setFormStatus(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - BMW Showroom</title>
        <meta name="description" content="Log in to access your BMW Showroom account." />
      </Head>

      <main className={styles.loginContainer}>
        <h1 className={styles.pageTitle}>Login</h1>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
      </main>
    </>
  )
}

export default Login