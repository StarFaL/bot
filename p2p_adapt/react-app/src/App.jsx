import LegacyBehavior from './components/LegacyBehavior'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <nav style={{display:'flex', gap:'1rem', padding:'1rem', borderBottom:'1px solid #ccc'}}>
        <Link to="/">Dashboard</Link>
        <Link to="/create-offer">Create Offer</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
      </nav>\n      <LegacyBehavior />
      <div style={{padding:'1rem'}}>
        <Outlet />
      </div>
    </div>
  )
}
