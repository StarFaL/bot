import telebot, json, time
from datetime import datetime, timedelta

API_TOKEN = "8281686986:AAFBe2vs24Fj0OydFIvkn9a9vxC6iH8Nq3U"
bot = telebot.TeleBot(API_TOKEN)
WEB_APP_URL = "https://bot-eta-coral.vercel.app/"

DATA_FILE = "data.json"
data = {"players": {}, "prizes": {}}

def save_data():
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_data():
    global data
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        save_data()

def notify_players(prize_id):
    for uid in data['players']:
        bot.send_message(uid, f"🆕 Новий скарб з'явився! ID: {prize_id}")

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "🏴‍☠️ Вітаю у грі 'Полювання за Скарбами'! Відкрий меню і починай гру.")

@bot.message_handler(content_types=['web_app_data'])
def handle_webapp_data(message):
    user_id = str(message.from_user.id)
    try:
        data_from_app = json.loads(message.web_app_data.data)
    except Exception as e:
        bot.send_message(user_id, f"❌ Помилка JSON: {e}")
        return

    action = data_from_app.get("action")
    name = data_from_app.get("name", f"Капітан_{user_id}")

    if action == "set_profile":
        data['players'][user_id] = {
            "name": name,
            "avatar": data_from_app.get("avatar", ""),
            "found": 0,
            "hints": 0,
            "radius": 20,
            "used_hints": {},
            "agreement_accepted": False,
            "score": 0,
            "violations": 0
        }
        save_data()
        bot.send_message(user_id, f"🌟 {name}, профіль створено!")

    elif action == "accept_agreement":
        if user_id not in data['players']:
            data['players'][user_id] = {"name": name, "agreement_accepted": True}
        else:
            data['players'][user_id]['agreement_accepted'] = True
        save_data()
        bot.send_message(user_id, "✅ Угоду прийнято!")

    elif action == "get_treasures":
        treasures = "\n".join([f"{tid}: {t['loc_desc']}" for tid, t in data['prizes'].items()])
        bot.send_message(user_id, f"🔍 Доступні скарби:\n{treasures or 'Поки немає скарбів!'}")

    elif action == "get_hint":
        prize = next(iter(data['prizes'].values()), None)
        if prize:
            bot.send_message(user_id, f"💡 Підказка: шукай у {prize['loc_desc']}!")
        else:
            bot.send_message(user_id, "❌ Немає скарбів для підказки!")

    elif action == "hide_treasure":
        desc = data_from_app.get("description", "таємне місце")
        prize_id = f"{user_id}_{int(time.time())}"
        riddle = f"🏴‍☠️ Шукай скарб у місці: {desc}"
        data['prizes'][prize_id] = {
            "riddle": riddle,
            "loc_desc": desc,
            "hider": user_id,
            "expires": (datetime.now() + timedelta(hours=24)).isoformat()
        }
        data['players'][user_id]['score'] = data['players'][user_id].get('score', 0) + 5
        save_data()
        bot.send_message(user_id, f"✅ Скарб сховано! {riddle}")
        notify_players(prize_id)

    else:
        bot.send_message(user_id, f"❌ Невідома дія: {action}")

if __name__ == "__main__":
    load_data()
    bot.infinity_polling()
