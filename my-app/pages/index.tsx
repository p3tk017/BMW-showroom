import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>BMW Showroom</title>
        <meta name="description" content="Explore the BMW lineup and book a test drive." />
      </Head>

      <main className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay">
            <h1 className="hero-title">Welcome to BMW Showroom</h1>
            <p className="hero-subtitle">Explore the future of driving with BMW’s latest innovations.</p>
            <a href="/catalog" className="hero-button">View Models</a>
          </div>
        </section>

        {/* Models */}
        <section id="models" className="models-section">
          <h2 className="section-title">BMW Lineup</h2>
          <div className="models-grid">
            {[
              { name: "BMW M4", img: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/model-navigation/bmw-m4-coupe-lci-flyout.png?imwidth=1440" },
              { name: "BMW X6", img: "https://larte-design.com/storage/app/media/kits/bmw/x6-facelift/colors/skyscaper-grey/x6-g06-lci-facelift-front-skyscraper-grey.webp" },
              { name: "BMW M8", img: "https://platform.cstatic-images.com/in/v2/stock_photos/ee4e2129-6692-4b14-8f4e-6ccde815d791/b72c287f-51af-444b-ad5d-19bf609a4273.png" }, 
            ].map((car, i) => (
              <Link href={`/catalog`} className="model-card" key={i}>
                <Image src={car.img} alt={car.name} width={100} height={250} unoptimized className="model-image" />
                <div className="model-info">
                  <h3>{car.name}</h3>
                  <p>Experience the power and elegance of the {car.name}.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Book a Test Drive</h2>
          <p>Feel the thrill behind the wheel. Schedule a test drive today at your nearest dealership.</p>
          <a href="/contact" className="hero-button">Contact Us</a>
        </section>
      </main>
    </>
  )
}
