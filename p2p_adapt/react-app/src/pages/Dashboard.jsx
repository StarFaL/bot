import { useEffect, useState } from 'react'
import api from '../api'
import OfferCard from '../components/OfferCard'

export default function Dashboard() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    api.get('/offers').then(res => setOffers(res.data))
  }, [])

  return (
    <div>
      <h2>📋 Список офферов</h2>
      {offers.map(o => <OfferCard key={o.id} offer={o} />)}
    </div>
  )
}
