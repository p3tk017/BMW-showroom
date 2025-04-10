import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Catalog.module.css'
import { CarModels } from '@/types/CarModels'
import { GetStaticProps } from 'next'
import Link from 'next/link'

type CatalogProps = {
  models: CarModels[]
}

export default function Catalog({ models }: CatalogProps) {
  if (!models) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>BMW Catalog</title>
        <meta name="description" content="Browse all BMW models available at our showroom." />
      </Head>

      <main className={styles.catalogContainer}>
        <h1 className={styles.pageTitle}>BMW Catalog</h1>
        <div className={styles.grid}>
          {models.map((model) => (
            <Link href={`/catalog/${model.documentId}`} className={styles.card} key={model.documentId}>
              <Image
                src={model.imageUrl}
                alt={model.model}
                width={400}
                height={250}
                className={styles.image}
                unoptimized
              />
              <div className={styles.info}>
                <h2>BMW {model.model}</h2>
                <p>{model.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:1337/api/cars')
  const data = await res.json()

  return {
    props: {
      models: data.data
    },
    revalidate: 60, 
  }
}
