// app.js

// --------------------------------------
// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
tg.MainButton.hide();         // прячем основную кнопку Telegram (если мешает)
window.addEventListener('resize', () => tg.expand()); // повторно растягиваем при изменении размера экрана
tg.enableClosingConfirmation();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user || {};
const userId = user.id || null;
const username = user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim();

// --------------------------------------
// Функция вибрации
function vibrate() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50); // короткая вибрация 50 мс
  }
}

// --------------------------------------
// Функция для плавного переключения экранов
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

// --------------------------------------
// Функции для кнопок

function showAgreement() {
  vibrate();
  showScreen('agreement-screen');
}

function acceptAgreement() {
  vibrate();
  tg.sendData(JSON.stringify({ action: 'accept_agreement', user_id: userId }));
  showScreen('profile-screen');
}

function showMainMenu() {
  vibrate();
  const name = document.getElementById('player-name').value.trim();
  if (name) {
    tg.sendData(JSON.stringify({ action: 'set_profile', name, user_id: userId }));
    showScreen('main-menu');
  } else {
    alert('Введи своє ім\'я!');
  }
}

function showSearchTreasures() {
  vibrate();
  tg.sendData(JSON.stringify({ action: 'get_treasures', user_id: userId }));
  showScreen('search-treasures');

  const list = document.getElementById('treasure-list');
  list.innerHTML = '<p class="text-gray-300">Зачекай, завантажуємо скарби...</p>';
}

function showHideTreasure() {
  vibrate();
  showScreen('hide-treasure');
}

function submitHideTreasure() {
  vibrate();
  const desc = document.getElementById('hide-description').value.trim();
  if (desc) {
    tg.sendData(JSON.stringify({ action: 'hide_treasure', description: desc, user_id: userId }));
    showMainMenu();
  } else {
    alert('Введи опис скарбу!');
  }
}

function showAgreement() {
  showScreen('agreement-screen');
}

function acceptAgreement() {
  tg.sendData(JSON.stringify({ action: 'accept_agreement', user_id: userId }));
  showScreen('profile-screen');
}

function showMainMenu() {
  const name = document.getElementById('player-name').value.trim();
  if (name) {
    tg.sendData(JSON.stringify({ action: 'set_profile', name, user_id: userId }));
    showScreen('main-menu');
  } else {
    alert('Введи своє ім\'я!');
  }
}

function showSearchTreasures() {
  tg.sendData(JSON.stringify({ action: 'get_treasures', user_id: userId }));
  showScreen('search-treasures');

  // Пример заполнения списка (можно заменить на реальные данные с бота)
  const list = document.getElementById('treasure-list');
  list.innerHTML = '<p class="text-gray-300">Зачекай, завантажуємо скарби...</p>';
}

function showHideTreasure() {
  showScreen('hide-treasure');
}

function submitHideTreasure() {
  const desc = document.getElementById('hide-description').value.trim();
  if (desc) {
    tg.sendData(JSON.stringify({ action: 'hide_treasure', description: desc, user_id: userId }));
    showMainMenu();
  } else {
    alert('Введи опис скарбу!');
  }
}

// --------------------------------------
// Инициализация приложения при загрузке
document.addEventListener('DOMContentLoaded', () => {
  tg.expand();
  showScreen('start-screen');

  // Выводим username на стартовом экране
  const usernameEl = document.getElementById('tg-username');
  if (usernameEl) {
    usernameEl.textContent = username ? `Вітаємо, @${username}!` : 'Вітаємо, гравець!';
  }
});
