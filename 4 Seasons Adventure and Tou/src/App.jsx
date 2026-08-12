import { useState } from 'react'
import './App.css'

const navItems = [
  'Home',
  'Destinations',
  'Tour Packages',
  'Treks',
  'Expeditions',
  'Mountain Climbing',
  'Groups',
  'Customize Tour',
  'Gallery',
  'About',
  'Contact',
]

const business = {
  name: '4 Seasons Adventure & Tour',
  slogan: 'Explore Pakistan • Climb Higher • Experience the Adventure',
  tagline: 'Explore Pakistan. Climb Higher. Discover the North.',
  phone: '0355-5037976',
  phone2: '0343-4795526',
  whatsapp: '923555037976',
  whatsapp2: '923434795526',
  email: 'yourbusiness@gmail.com',
  facebook: '#',
  instagram: '#',
}

const heroImage = '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.20%20AM.jpeg'
const mountainImage = '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.17%20AM.jpeg'
const glacierImage = '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.18%20AM.jpeg'
const campImage = '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.19%20AM.jpeg'

const touristPaths = [
  'Family Tours',
  'Couple Tours',
  'Group Tours',
  'Sightseeing',
  'Customized Tours',
]

const adventurerPaths = [
  'Trekking',
  'Hiking',
  'Camping',
  'Mountain Climbing',
  'Expeditions',
  'K2 / Nanga Parbat / Karakoram',
]

const adventureCards = [
  {
    title: 'Mountaineering',
    text: 'High-altitude climbing and mountain expeditions across the Karakoram and Himalayan ranges.',
    button: 'Explore Expeditions',
    image: glacierImage,
  },
  {
    title: 'Trekking',
    text: 'Explore some of Pakistan’s most spectacular trekking routes through glacier valleys and high passes.',
    button: 'Explore Treks',
    image: campImage,
  },
  {
    title: 'Camping',
    text: 'Wake up under the stars with memorable nights in scenic wilderness and alpine campsites.',
    button: 'Explore Camping',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.23%20AM.jpeg',
  },
  {
    title: 'Adventure Tours',
    text: 'Discover valleys, alpine lakes, deserts, and mountain roads with custom road-trip itineraries.',
    button: 'Explore Tours',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.24%20AM.jpeg',
  },
  {
    title: 'Group Adventures',
    text: 'Join friends, clubs, universities, and adventure groups for structured, high-energy mountain travel.',
    button: 'Group Tours',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.25%20AM.jpeg',
  },
  {
    title: 'Family Tours',
    text: 'Comfortable and safe travel experiences designed with families in mind, from scenic stops to cultural immersion.',
    button: 'Family Tours',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.18%20AM%20(1).jpeg',
  },
]

const expeditionCards = [
  {
    name: 'K2 Expedition',
    details: 'K2 region • Baltoro Glacier • Concordia • High-altitude adventure',
    cta: 'Explore K2 Expedition',
    image: glacierImage,
    route: '#expedition-request',
  },
  {
    name: 'Nanga Parbat',
    details: 'Nanga Parbat • Fairy Meadows • Base Camp • Trekking • Mountain scenery',
    cta: 'Explore Nanga Parbat',
    image: mountainImage,
    route: '#expedition-request',
  },
  {
    name: 'Broad Peak',
    details: 'Broad Peak • Concordia • Baltoro Glacier • High-altitude expedition',
    cta: 'Explore Expedition',
    image: campImage,
    route: '#expedition-request',
  },
  {
    name: 'Gasherbrum',
    details: 'Gasherbrum region • High-altitude climbing • Glacier expedition • Base camps',
    cta: 'Explore Expedition',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.19%20AM%20(1).jpeg',
    route: '#expedition-request',
  },
  {
    name: 'Rakaposhi',
    details: 'Rakaposhi • Hunza • Base Camp trekking • Mountain views',
    cta: 'Explore Rakaposhi',
    image: '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.23%20AM%20(1).jpeg',
    route: '#custom-tour',
  },
]

const trekCards = [
  ['Baltoro Glacier', '8–10 Days', 'Moderate to Challenging', '4,500m', 'June–Sep', 'Skardu'],
  ['Concordia', '6–8 Days', 'Challenging', '4,600m', 'June–Sep', 'Skardu'],
  ['K2 Base Camp', '14–18 Days', 'Extreme', '5,200m', 'June–Sep', 'Skardu'],
  ['Nanga Parbat Base Camp', '6–8 Days', 'Challenging', '4,200m', 'June–Sep', 'Fairy Meadows'],
  ['Fairy Meadows', '4 Days', 'Easy to Moderate', '3,300m', 'May–Sep', 'Naran / Raikot'],
  ['Rakaposhi Base Camp', '5–7 Days', 'Moderate', '3,800m', 'May–Sep', 'Gilgit'],
  ['Passu Glacier', '4–6 Days', 'Moderate', '3,200m', 'Jun–Sep', 'Hunza'],
  ['Deosai', '3–5 Days', 'Easy to Moderate', '4,115m', 'June–Sep', 'Skardu'],
]

const difficultyLevels = [
  { name: 'Easy', tone: 'easy', text: 'Suitable for beginners and families.' },
  { name: 'Moderate', tone: 'moderate', text: 'Suitable for reasonably fit travelers.' },
  { name: 'Challenging', tone: 'challenging', text: 'Requires good physical fitness and trekking experience.' },
  { name: 'Extreme', tone: 'extreme', text: 'High-altitude mountaineering and technical expeditions.' },
]

const packageCards = [
  { title: 'Skardu Adventure', subtitle: '5 Days / 4 Nights', audience: 'Families • Couples • Friends', price: 'From PKR 55,000' },
  { title: 'Fairy Meadows Trek', subtitle: '4 Days / 3 Nights', audience: 'Beginners • Trekkers • Nature Lovers', price: 'From PKR 38,000' },
  { title: 'Nanga Parbat Base Camp', subtitle: '6 Days / 5 Nights', audience: 'Experienced Trekkers', price: 'Custom Quote' },
  { title: 'K2 Base Camp Trek', subtitle: '14–18 Days', audience: 'Experienced High-Altitude Trekkers', price: 'Custom Quote' },
  { title: 'Mountain Expedition', subtitle: 'Customized duration', audience: 'Experienced Mountaineers', price: 'Custom Quote' },
  { title: 'Group Adventure Pakistan', subtitle: 'Customized duration', audience: 'Universities • Clubs • Companies • Friends', price: 'Custom Quote' },
]

const services = [
  'Local Mountain Guides',
  'Base Camp Support',
  'Porter / Support Team',
  '4x4 Transport',
  'Accommodation',
  'Trekking Support',
  'Expedition Planning',
  'Photography Adventures',
]

const galleryImages = [
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.17%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.18%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.19%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.20%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.23%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.25%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.24%20AM.jpeg',
  '/gallery/WhatsApp%20Image%202026-08-09%20at%2012.11.17%20AM%20(1).jpeg',
]

const reviews = [
  {
    name: 'Ayesha & Hamza',
    role: 'Family Tour',
    quote: 'The route was smooth, comfortable and beautifully planned. We felt safe while exploring Hunza and Skardu with our children.',
  },
  {
    name: 'Usman R.',
    role: 'Trekker',
    quote: 'The trekking support and local guidance made a huge difference. Every detail was handled with care and professionalism.',
  },
  {
    name: 'International Group',
    role: 'Adventure Travelers',
    quote: 'A truly premium experience in Pakistan’s north. The team understood our expectations and delivered a memorable route.',
  },
]

const stories = [
  'Trekking to K2 Base Camp',
  'Exploring Baltoro Glacier',
  'Nanga Parbat Base Camp Adventure',
  'Best Treks in Gilgit-Baltistan',
  'Things to Know Before High-Altitude Trekking',
  'What to Pack for a Mountain Trek',
  'Exploring Hunza Valley',
  'Skardu Adventure Guide',
]

const faqItems = [
  { q: 'What is the best time to visit Gilgit-Baltistan?', a: 'Spring and summer are ideal for most northern tours, while autumn offers scenic landscapes and cooler weather. For mountaineering and trekking, route-specific conditions matter most.' },
  { q: 'Do you offer private and customized tours?', a: 'Yes. We tailor itineraries based on your preferences, travel dates, destination goals, accommodation needs, and budget.' },
  { q: 'Can families and beginners travel with you?', a: 'Absolutely. We offer comfortable and scenic options for families, couples, and first-time travelers, as well as more demanding adventure routes.' },
  { q: 'Do you support expeditions and technical mountaineering?', a: 'We organize expedition planning support, local guide coordination, and route consultation depending on the mountain, experience level, and safety requirements.' },
  { q: 'How far in advance should I book?', a: 'For peak seasons and expedition planning, we recommend booking early to secure transport, hotels, and guide support.' },
]

const welcomeMessage = `🏔️ **Welcome to 4 Seasons Adventure & Tour!**

Thank you for reaching out to us — we’re delighted to have you with us! 🌄
Whether you’re planning a family trip, private tour, trekking adventure, or mountain expedition, we’re here to make it memorable.
Tell us your destination, travel dates, and requirements, and our team will help you create the perfect journey.
**Let’s explore Pakistan and discover the beauty of Gilgit-Baltistan together! 🇵🇰🏔️**`

const whatsappLink = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(welcomeMessage)}`
const whatsappLink2 = `https://wa.me/${business.whatsapp2}?text=${encodeURIComponent(welcomeMessage)}`

function App() {
  const [statusMessage, setStatusMessage] = useState('')

  const handleInquirySubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    const requiredFields = ['name', 'phone', 'travelDates']

    const missingField = requiredFields.find((field) => !String(payload[field] || '').trim())

    if (missingField) {
      setStatusMessage('Please complete your name, phone, and preferred travel dates.')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send inquiry.')
      }

      setStatusMessage(result.message || 'Your inquiry has been sent successfully.')
      form.reset()
    } catch (error) {
      setStatusMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="adventure-page">
      <header className="topbar">
        <div className="container nav-row">
          <a href="#home" className="brand-lockup" aria-label="4 Seasons Adventure & Tour home">
            <img src="/logo.png" alt="4 Seasons Adventure & Tour logo" />
            <div>
              <span className="brand-main">4 Seasons Adventure & Tour</span>
              <small>{business.slogan}</small>
            </div>
          </a>

          <nav className="main-nav" aria-label="Main menu">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
                {item}
              </a>
            ))}
          </nav>

          <a href={whatsappLink} target="_blank" rel="noreferrer" className="plan-button">
            Plan Your Adventure
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home" style={{ backgroundImage: `linear-gradient(90deg, rgba(8, 43, 69, 0.84), rgba(8, 43, 69, 0.38)), url('${heroImage}')` }}>
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="kicker">Adventure Tours • Trekking • Mountaineering • Private Expeditions</p>
              <h1>CLIMB HIGHER. EXPLORE FURTHER.</h1>
              <p className="hero-subtext">
                Discover the world’s most breathtaking mountain landscapes in Pakistan. From scenic family tours to high-altitude trekking and mountaineering expeditions, we design unforgettable experiences across Gilgit-Baltistan and the Karakoram.
              </p>
              <div className="hero-actions">
                <a href="#adventure" className="primary-btn">🏔️ Explore Adventures</a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="secondary-btn">🧗 Mountain Expeditions</a>
                <a href="#custom-tour" className="outline-btn">Customize Your Tour</a>
              </div>
              <div className="hero-stats">
                <div><strong>10+</strong><span>Destinations</span></div>
                <div><strong>Private &amp; Group</strong><span>Tours</span></div>
                <div><strong>Local</strong><span>Mountain Guides</span></div>
                <div><strong>Customized</strong><span>Expeditions</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker-bar">
          <div className="ticker-track">
            <span>K2 Region</span>
            <span>Nanga Parbat</span>
            <span>Hunza</span>
            <span>Skardu</span>
            <span>Deosai</span>
            <span>Fairy Meadows</span>
            <span>Rakaposhi</span>
            <span>Gilgit-Baltistan</span>
          </div>
        </div>

        <section className="section split-section">
          <div className="container split-grid">
            <article className="path-card tourist-card">
              <span className="mini-label">🌄 TOURIST</span>
              <h2>I want to explore Pakistan</h2>
              <ul>
                {touristPaths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#custom-tour" className="primary-btn">Customize My Tour</a>
            </article>

            <article className="path-card adventurer-card">
              <span className="mini-label">🏔️ ADVENTURER</span>
              <h2>I want an adventure</h2>
              <ul>
                {adventurerPaths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="primary-btn">Plan Expedition</a>
            </article>
          </div>
        </section>

        <section className="section" id="adventure">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Choose your adventure</span>
              <h2>Find the experience that matches your pace.</h2>
            </div>
            <div className="cards-grid six-grid">
              {adventureCards.map((card) => (
                <article className="adventure-card" key={card.title}>
                  <div className="card-art" style={{ backgroundImage: `url('${card.image}')` }} />
                  <div className="card-body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <a href="#custom-tour" className="card-link">{card.button}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section expedition-section" id="expeditions">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Mountain Expeditions</span>
              <h2>Conquer the giants of Pakistan</h2>
              <p>Experience the legendary mountains of the Karakoram and Himalayas.</p>
            </div>
            <div className="cards-grid expedition-grid">
              {expeditionCards.map((trip) => (
                <article className="expedition-card" key={trip.name}>
                  <div className="expedition-photo" style={{ backgroundImage: `url('${trip.image}')` }} />
                  <div className="expedition-copy">
                    <h3>{trip.name}</h3>
                    <p>{trip.details}</p>
                    <a href={trip.route} className="primary-btn small-btn">{trip.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="treks">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Trekking destinations</span>
              <h2>Walk among giants</h2>
            </div>
            <div className="trek-grid">
              {trekCards.map(([name, duration, difficulty, altitude, season, start]) => (
                <article className="trek-card" key={name}>
                  <div className="trek-header">
                    <h3>{name}</h3>
                    <span>{difficulty}</span>
                  </div>
                  <ul>
                    <li><strong>Duration:</strong> {duration}</li>
                    <li><strong>Altitude:</strong> {altitude}</li>
                    <li><strong>Best season:</strong> {season}</li>
                    <li><strong>Starting point:</strong> {start}</li>
                  </ul>
                  <a href="#custom-tour" className="card-link">View Trek</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="difficulty">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Difficulty levels</span>
              <h2>Choose the right challenge for your experience.</h2>
            </div>
            <div className="difficulty-grid">
              {difficultyLevels.map((level) => (
                <div className={`difficulty-card ${level.tone}`} key={level.name}>
                  <span>{level.name}</span>
                  <p>{level.text}</p>
                </div>
              ))}
            </div>
            <p className="disclaimer">
              Actual difficulty depends on route, altitude, weather, season, and individual experience.
            </p>
          </div>
        </section>

        <section className="section muted" id="groups">
          <div className="container group-layout">
            <div>
              <span className="eyebrow alt">Group adventures</span>
              <h2>Adventure is better together</h2>
              <p>
                From university groups and friends’ trips to photography expeditions and corporate outings, we plan unforgettable journeys across Pakistan’s northern frontier.
              </p>
              <ul className="simple-list">
                <li>Friends and hiking clubs</li>
                <li>Corporate and team groups</li>
                <li>Photography and university groups</li>
                <li>International travelers and family groups</li>
              </ul>
              <a href="#custom-tour" className="primary-btn">Plan a Group Adventure</a>
            </div>
            <form className="mini-form" onSubmit={handleInquirySubmit}>
              <label>
                Full name
                <input type="text" name="name" placeholder="e.g. 12 travelers" required />
              </label>
              <label>
                Phone / WhatsApp
                <input type="tel" name="phone" placeholder="03xx xxxxxxx" required />
              </label>
              <label>
                Destination
                <input type="text" name="destination" placeholder="Hunza / Skardu / K2" />
              </label>
              <label>
                Travel dates
                <input type="text" name="travelDates" placeholder="June 2026" required />
              </label>
              <label>
                Requirements
                <textarea name="message" rows="4" placeholder="Transport, accommodation, guide, camping, food, budget..." />
              </label>
              <button type="submit" className="primary-btn">Request Group Plan</button>
            </form>
          </div>
        </section>

        <section className="section custom-tour" id="custom-tour">
          <div className="container custom-layout">
            <div>
              <span className="eyebrow alt">Custom private tour</span>
              <h2>Your mountain. Your route. Your adventure.</h2>
              <p>
                Design a trip around your dates, group, and level of adventure — from scenic family holidays to serious mountain travel.
              </p>
            </div>

            <form className="booking-form wide-form" onSubmit={handleInquirySubmit}>
              <div className="field-grid two-col">
                <label>
                  Full Name
                  <input type="text" name="name" placeholder="Your full name" required />
                </label>
                <label>
                  WhatsApp
                  <input type="tel" name="phone" placeholder="03xx xxxxxxx" required />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@example.com" />
                </label>
                <label>
                  Country
                  <input type="text" name="country" placeholder="Pakistan / UAE / UK" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Departure City
                  <input type="text" name="departureCity" placeholder="Islamabad / Lahore / Karachi" />
                </label>
                <label>
                  Destination
                  <input type="text" name="destination" placeholder="Skardu / Hunza / K2" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Travel Date
                  <input type="text" name="travelDates" placeholder="June 20–30" required />
                </label>
                <label>
                  Number of Travelers
                  <input type="text" name="groupSize" placeholder="2 adults / 1 child" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Tour Type
                  <select name="tourType">
                    <option>Sightseeing</option>
                    <option>Trekking</option>
                    <option>Hiking</option>
                    <option>Camping</option>
                    <option>Mountaineering</option>
                    <option>Photography</option>
                    <option>Family Tour</option>
                    <option>Couple Tour</option>
                    <option>Group Adventure</option>
                  </select>
                </label>
                <label>
                  Trekking Level
                  <select name="difficulty">
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Challenging</option>
                    <option>Extreme</option>
                  </select>
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Preferred Accommodation
                  <input type="text" name="accommodation" placeholder="Hotel / Guest House / Camp" />
                </label>
                <label>
                  Transportation
                  <input type="text" name="transport" placeholder="Car / Prado / Jeep / Hiace" />
                </label>
              </div>

              <label>
                Special Requirements
                <textarea name="message" rows="4" placeholder="Budget, food, guide support, camping, medical notes..." />
              </label>

              {statusMessage ? <p className="form-status">{statusMessage}</p> : null}
              <button type="submit" className="primary-btn form-button">Create My Adventure</button>
            </form>
          </div>
        </section>

        <section className="section expedition-request" id="expedition-request">
          <div className="container request-layout">
            <div>
              <span className="eyebrow alt">Expedition planning</span>
              <h2>Plan your expedition</h2>
              <p>
                Mountain expeditions are subject to weather, route conditions, permits, regulations, safety assessments and other factors beyond our control.
              </p>
            </div>

            <form className="booking-form wide-form" onSubmit={handleInquirySubmit}>
              <div className="field-grid two-col">
                <label>
                  Full Name
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  Nationality
                  <input type="text" name="nationality" placeholder="Pakistani / International" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  WhatsApp
                  <input type="tel" name="phone" placeholder="03xx xxxxxxx" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@example.com" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Mountain
                  <input type="text" name="destination" placeholder="K2 / Nanga Parbat / Broad Peak" />
                </label>
                <label>
                  Expedition Type
                  <input type="text" name="expeditionType" placeholder="Base camp / summit support / acclimatization" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Number of Climbers
                  <input type="text" name="groupSize" placeholder="4 climbers" />
                </label>
                <label>
                  Previous Climbing Experience
                  <input type="text" name="experience" placeholder="Years / peaks climbed" />
                </label>
              </div>

              <div className="field-grid two-col">
                <label>
                  Preferred Expedition Dates
                  <input type="text" name="travelDates" placeholder="June–August" required />
                </label>
                <label>
                  Number of Days
                  <input type="text" name="duration" placeholder="14 days" />
                </label>
              </div>

              <label>
                Special Requirements
                <textarea name="message" rows="4" placeholder="Guide support, porter team, equipment needs, accommodation requirements..." />
              </label>

              {statusMessage ? <p className="form-status">{statusMessage}</p> : null}
              <button type="submit" className="primary-btn form-button">Request Expedition Plan</button>
            </form>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Services for mountaineers</span>
              <h2>Professional support for serious adventures</h2>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service}>
                  <div className="service-icon">✦</div>
                  <h3>{service}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="transport">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Transportation</span>
              <h2>Move through the north with confidence.</h2>
            </div>
            <div className="transport-grid">
              <div className="vehicle-card"><span>🚙</span><h3>Car</h3></div>
              <div className="vehicle-card"><span>🚘</span><h3>Prado</h3></div>
              <div className="vehicle-card"><span>🚙</span><h3>Jeep</h3></div>
              <div className="vehicle-card"><span>🚐</span><h3>Hiace</h3></div>
              <div className="vehicle-card"><span>🚌</span><h3>Coaster</h3></div>
              <div className="vehicle-card"><span>✈️</span><h3>Islamabad → Skardu → Islamabad</h3></div>
            </div>
          </div>
        </section>

        <section className="section" id="gallery">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Gallery</span>
              <h2>Mountain moments worth capturing</h2>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((img, index) => (
                <div className={`gallery-item item-${index + 1}`} key={img}>
                  <img src={img} alt="Adventure landscape" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="stories">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Adventure stories</span>
              <h2>Stories from the mountains</h2>
            </div>
            <div className="story-grid">
              {stories.map((story) => (
                <article className="story-card" key={story}>
                  <div className="story-badge">Story</div>
                  <h3>{story}</h3>
                  <a href="#contact" className="card-link">Read More</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">Customer reviews</span>
              <h2>Stories from our travelers</h2>
            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <p>“{review.quote}”</p>
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about-us">
          <div className="container about-layout">
            <div className="about-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(8,43,69,0.18), rgba(8,43,69,0.3)), url('${mountainImage}')` }} />
            <div className="about-copy">
              <span className="eyebrow alt">About us</span>
              <h2>About 4 Seasons Adventure &amp; Tour</h2>
              <p>
                We provide tourism, adventure, trekking, mountaineering, and customized travel experiences across Gilgit-Baltistan, the Karakoram, and the Himalayas. Our team combines local knowledge, route planning, and expedition support to create safe, meaningful experiences for every kind of traveler.
              </p>
              <ul className="simple-list">
                <li>Gilgit-Baltistan expertise</li>
                <li>Customized itineraries</li>
                <li>Local route knowledge</li>
                <li>Group, family, and expedition planning</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container">
            <div className="section-heading center">
              <span className="eyebrow alt">FAQ</span>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.q} className="faq-item" open={item.q === 'What is the best time to visit Gilgit-Baltistan?'}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow alt">Contact</span>
              <h2>Ready for your next adventure?</h2>
              <p>
                Whether you’re planning a family holiday, a group adventure, a trekking journey or a mountain expedition, talk to our team and build your trip around your goals.
              </p>
              <div className="contact-lines">
                <a href={whatsappLink} target="_blank" rel="noreferrer">{business.phone}</a>
                <a href={whatsappLink2} target="_blank" rel="noreferrer">{business.phone2}</a>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
              <div className="contact-actions">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="primary-btn">WhatsApp Us</a>
                <a href={`tel:${business.phone.replace(/-/g, '')}`} className="secondary-btn">Call Now</a>
                <a href="#custom-tour" className="outline-btn">Customize My Tour</a>
                <a href="#expedition-request" className="outline-btn">Plan Expedition</a>
              </div>
            </div>

            <form className="booking-form contact-form" onSubmit={handleInquirySubmit}>
              <label>
                Full Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Phone / WhatsApp
                <input type="tel" name="phone" placeholder="03xx xxxxxxx" required />
              </label>
              <label>
                Preferred travel dates
                <input type="text" name="travelDates" placeholder="June 20–30" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Tell us about your trip or expedition plan..." />
              </label>
              {statusMessage ? <p className="form-status">{statusMessage}</p> : null}
              <button type="submit" className="primary-btn form-button">Send Inquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="container footer-grid">
          <div>
            <h3>4 Seasons Adventure &amp; Tour</h3>
            <p>Explore Pakistan • Climb Higher • Experience the Adventure</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li>Skardu</li>
              <li>Hunza</li>
              <li>Gilgit</li>
              <li>Deosai</li>
              <li>Fairy Meadows</li>
              <li>Naltar</li>
            </ul>
          </div>

          <div>
            <h4>Adventures</h4>
            <ul>
              <li>Trekking</li>
              <li>Hiking</li>
              <li>Camping</li>
              <li>Mountaineering</li>
              <li>Expeditions</li>
              <li>Group Adventures</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Gallery</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>{business.phone}</li>
              <li>{business.phone2}</li>
              <li>{business.email}</li>
              <li>WhatsApp</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </footer>

      <a href={whatsappLink} className="floating-whatsapp" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        WhatsApp
      </a>
    </div>
  )
}

export default App
