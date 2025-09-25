export default function OfferCard({ offer }) {
  return (
    <div className="offer-card">
      <h3>{offer.type === 'buy' ? 'Покупка' : 'Продажа'} {offer.currency}</h3>
      <p>Цена: {offer.price}</p>
      <p>Лимиты: {offer.min} - {offer.max}</p>
      <button>Начать сделку</button>
    </div>
  )
}
