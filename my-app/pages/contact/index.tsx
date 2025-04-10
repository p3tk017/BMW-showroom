import Head from 'next/head'
import styles from '../../styles/Contact.module.css'

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us - BMW Showroom</title>
        <meta name="description" content="Get in touch with us through social media." />
      </Head>

      <main className={styles.contactContainer}>
        <h1 className={styles.pageTitle}>Contact Us</h1>
        <p className={styles.socialText}>on our social media platforms:</p>

        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Facebook
          </a>
          <a href="https://www.instagram.com/_p3tk0_" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Instagram
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Twitter
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
        </div>
      </main>
    </>
  )
}

export default Contact
