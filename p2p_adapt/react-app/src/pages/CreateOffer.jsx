import { useState } from 'react'
import api from '../api'

export default function CreateOffer() {
  const [form, setForm] = useState({type:'sell', currency:'USDT', price:0, min:0, max:0})

  const submit = e => {
    e.preventDefault()
    api.post('/offers', form).then(res => {
      alert('Offer created!')
    })
  }

  return (
    <form onSubmit={submit}>
      <h2>Создать оффер</h2>
      <input placeholder="Currency" value={form.currency} onChange={e=>setForm({...form, currency:e.target.value})}/>
      <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
      <input placeholder="Min" type="number" value={form.min} onChange={e=>setForm({...form, min:e.target.value})}/>
      <input placeholder="Max" type="number" value={form.max} onChange={e=>setForm({...form, max:e.target.value})}/>
      <button type="submit">Создать</button>
    </form>
  )
}
