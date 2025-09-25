/**
 * Minimal Express backend scaffold for P2P marketplace
 * - Auth routes (placeholder)
 * - Offers and trades endpoints (skeleton)
 * - WebSocket for chat (ws)
 *
 * NOTE: This is a template. Replace placeholders and secure before production.
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// In-memory demo stores (replace with DB)
const OFFERS = [];
const TRADES = [];
const USERS = [];

app.get('/api/v1/health', (req, res)=> res.json({ok:true, ts: Date.now()}));

// Auth (placeholders)
app.post('/api/v1/auth/register', (req, res) => {
  // validate and create user
  const {email} = req.body;
  const id = USERS.length + 1;
  USERS.push({id, email});
  res.json({id, email});
});

// Offers
app.post('/api/v1/offers', (req, res) => {
  const id = OFFERS.length + 1;
  const o = Object.assign({id, created_at: new Date()}, req.body);
  OFFERS.push(o);
  res.json(o);
});
app.get('/api/v1/offers', (req, res) => res.json(OFFERS));

// Trades
app.post('/api/v1/trades', (req, res) => {
  const id = TRADES.length + 1;
  const t = Object.assign({id, status:'pending', created_at: new Date()}, req.body);
  TRADES.push(t);
  res.json(t);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Backend scaffold listening on', PORT));
