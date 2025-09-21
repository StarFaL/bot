// --------------------------------------
// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
console.log(tg); 
if (tg) {
  tg.ready();
  tg.expand();
  tg.MainButton?.hide();
  window.addEventListener('resize', () => tg.expand());
  tg.enableClosingConfirmation();
}

// Получаем данные пользователя
const user = tg?.initDataUnsafe?.user || {};
const userId = user.id || null;
const username = user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim();

// --------------------------------------
// Функции вибрации через Telegram HapticFeedback
function vibrateTap() {
  tg?.HapticFeedback?.impactOccurred("light"); 
}

function vibrateConfirm() {
  tg?.HapticFeedback?.notificationOccurred("success");
}

function vibrateError() {
  tg?.HapticFeedback?.notificationOccurred("error");
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
    console.log(document.getElementById(id)); // Проверка DOM-элемента
    if (!screen) return;
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
  showScreen('agreement-screen');
}

function acceptAgreement() {
  vibrateConfirm();
  tg?.sendData(JSON.stringify({ action: 'accept_agreement', user_id: userId }));
  showScreen('profile-screen');
}

function showMainMenu() {
  const name = document.getElementById('player-name')?.value.trim();
  if (name) {
    vibrateConfirm();
    tg?.sendData(JSON.stringify({ action: 'set_profile', name, user_id: userId }));
    showScreen('main-menu');
  } else {
    vibrateError();
    alert('Введи своє ім\'я!');
  }
}

function showSearchTreasures() {
  tg?.sendData(JSON.stringify({ action: 'get_treasures', user_id: userId }));
  showScreen('search-treasures');

  const list = document.getElementById('treasure-list');
  if (list) list.innerHTML = '<p class="text-gray-300">Зачекай, завантажуємо скарби...</p>';
}

function showHideTreasure() {
  showScreen('hide-treasure');
}

function submitHideTreasure() {
  const desc = document.getElementById('hide-description')?.value.trim();
  if (desc) {
    vibrateConfirm();
    tg?.sendData(JSON.stringify({ action: 'hide_treasure', description: desc, user_id: userId }));
    showMainMenu();
  } else {
    vibrateError();
    alert('Введи опис скарбу!');
  }
}

// --------------------------------------
// Инициализация приложения при загрузке
document.addEventListener('DOMContentLoaded', () => {
  tg?.expand();
  showScreen('start-screen');

  const usernameEl = document.getElementById('tg-username');
  if (usernameEl) {
    usernameEl.textContent = username ? `Вітаємо, @${username}!` : 'Вітаємо, гравець!';
  }

  // Автоматическая вибрация для всех кнопок
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => vibrateTap());
  });
});
