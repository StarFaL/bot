import { useEffect, useState } from 'react'

export default function LegacyBehavior() {
  const [username, setUsername] = useState('гравець')

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready();
        tg.expand && tg.expand();
        tg.MainButton && tg.MainButton.hide && tg.MainButton.hide();
        tg.enableClosingConfirmation && tg.enableClosingConfirmation();
      } catch(e) {
        console.warn('tg init error', e);
      }
      const u = tg.initDataUnsafe?.user || {};
      const name = u.username ? `@${u.username}` : `${u.first_name || ''} ${u.last_name || ''}`.trim();
      if (name) setUsername(name);
      // expand on resize
      const onResize = () => tg.expand && tg.expand();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    } else {
      // Non-telegram fallback: try to read a global user placeholder
      const fallback = window.__P2P_USER || {};
      if (fallback.username) setUsername('@' + fallback.username);
    }
  }, [])

  useEffect(() => {
    // global vibration/tap feedback for buttons
    function vibrateTap() {
      if (navigator.vibrate) navigator.vibrate(20);
    }
    function handler(e) {
      const t = e.target;
      if (t && (t.tagName === 'BUTTON' || t.closest && t.closest('button'))) {
        vibrateTap();
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [])

  return (
    <div style={{padding:'0.5rem 1rem', background:'#111', color:'#fff'}}>
      <div id="tg-username">Вітаємо, {username}!</div>
    </div>
  )
}
