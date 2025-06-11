import os
import requests
from flask import Flask, request

app = Flask(__name__)

TOKEN = "7683268580:AAGMJJzzjB61aarv6TZukFNI3CBmggO45Eg"  # <-- Вставь свой токен
WEBAPP_URL = "https://github.com/naumzyy/durak-miniapp.git"  # <-- Вставь свою ссылку на миниаппу

def send_webapp_button(chat_id):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": "Нажми, чтобы открыть игру 🎮",
        "reply_markup": {
            "inline_keyboard": [[{
                "text": "Играть в Дурака",
                "web_app": {"url": WEBAPP_URL}
            }]]
        }
    }
    requests.post(url, json=payload)

@app.route("/", methods=["POST"])
def webhook():
    data = request.get_json()
    message = data.get("message", {})
    chat_id = message.get("chat", {}).get("id")
    text = message.get("text", "")

    if text == "/start" and chat_id:
        send_webapp_button(chat_id)

    return {"ok": True}

if __name__ == "__main__":
    app.run(debug=True)