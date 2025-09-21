const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user?.id || null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
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


tg.ready();
