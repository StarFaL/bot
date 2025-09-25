import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateOffer from './pages/CreateOffer'
import TradeView from './pages/TradeView'
import Wallet from './pages/Wallet'
import AdminPanel from './pages/AdminPanel'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="create-offer" element={<CreateOffer />} />
          <Route path="trade/:id" element={<TradeView />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
