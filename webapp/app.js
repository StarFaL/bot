// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand(); // открыть на весь экран
tg.enableClosingConfirmation();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user || {};
const username = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
const userId = user.id || null;

// Функция для переключения экранов
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('opacity-100');
    s.classList.add('opacity-0');
  });

  setTimeout(() => {
    const screen = document.getElementById(id);
    screen.classList.remove('hidden');
    setTimeout(() => {
      screen.classList.remove('opacity-0');
      screen.classList.add('opacity-100');
    }, 10);
  }, 10);
}

// Вставка username на стартовый экран
document.addEventListener('DOMContentLoaded', () => {
  tg.expand();
  showScreen('start-screen');

  const usernameEl = document.getElementById('tg-username');
  if (usernameEl) {
    usernameEl.textContent = username ? `Вітаємо, ${username}!` : 'Вітаємо, гравець!';
  }
});
