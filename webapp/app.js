const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user?.id || null;

// Инициализация приложения
function initApp() {
  tg.expand();
  tg.enableClosingConfirmation();
  
  // Показываем стартовый экран
  showScreen('start-screen');
}

// Показать экран
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

function showAgreement() {
  showScreen('agreement-screen');
}

function acceptAgreement() {
  tg.sendData(JSON.stringify({ action: 'accept_agreement', user_id: userId }));
  showScreen('profile-screen');
}

function showMainMenu() {
  const name = document.getElementById('player-name').value;
  if (name) {
    tg.sendData(JSON.stringify({ action: 'set_profile', name, user_id: userId }));
  }
  showScreen('main-menu');
}

function showSearchTreasures() {
  tg.sendData(JSON.stringify({ action: 'get_treasures', user_id: userId }));
  showScreen('search-treasures');
}

function showHideTreasure() {
  showScreen('hide-treasure');
}

function submitHideTreasure() {
  const desc = document.getElementById('hide-description').value;
  if (desc) {
    tg.sendData(JSON.stringify({ action: 'hide_treasure', description: desc, user_id: userId }));
    showMainMenu();
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initApp);
tg.ready();
