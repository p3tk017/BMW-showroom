import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/CarDetail.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import { CarModels } from '@/types/CarModels'

type CarDetailProps = {
  car: CarModels
}

const CarDetail = ({ car }: CarDetailProps) => {
  return (
    <>
      <Head>
        <title>{car.model} - BMW Showroom</title>
        <meta name="description" content={`Details about the ${car.model}`} />
      </Head>

      <main className={styles.carDetailContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={car.imageUrl}
            alt={car.model}
            width={800}
            height={450}
            className={styles.carImage}
            unoptimized
          />
        </div>
        <div className={styles.infoSection}>
          <h1>BMW {car.model}</h1>
          <p>{car.description}</p>
        </div>
      </main>
    </>
  )
}

export default CarDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:1337/api/cars')
  const data = await res.json()

  const paths = data.data.map((car: CarModels) => ({
    params: { id: car.documentId.toString() } 
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:1337/api/cars/${params?.id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      car: data.data
    },
    revalidate: 60
  }
}
