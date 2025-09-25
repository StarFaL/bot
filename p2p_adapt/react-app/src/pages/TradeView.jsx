import { useParams } from 'react-router-dom'

export default function TradeView() {
  const {id} = useParams()
  return <h2>Trade View #{id}</h2>
}
