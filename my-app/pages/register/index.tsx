import Head from 'next/head'
import { useState } from 'react'
import styles from '../../styles/Register.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setFormStatus('Please fill in all fields.')
      return
    }

    setIsLoading(true)
    setFormStatus('')

    try {
      const res = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error?.message || 'Registration failed')
      }

      login(data.jwt)
      // localStorage.setItem('user', JSON.stringify(data.user))

      setFormStatus('Registration successful!')
      setFormData({ name: '', email: '', password: '' })

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
        <title>Register - BMW Showroom</title>
        <meta name="description" content="Register for BMW Showroom to receive updates and offers." />
      </Head>

      <main className={styles.registerContainer}>
        <h1 className={styles.pageTitle}>Register</h1>

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
      </main>
    </>
  )
}

export default Register
