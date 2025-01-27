import random
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters
from telegram.ext import CallbackContext

# Žaidimo būsenos (žaidėjo taškai)
player_scores = {}

# Pradėti žaidimą
async def start(update: Update, context: CallbackContext):
    player_id = update.message.from_user.id
    if player_id not in player_scores:
        player_scores[player_id] = 0  # Nustatome pradinius taškus
    await update.message.reply_text(f"Sveiki! Žaidimas prasideda! Jūsų taškai: {player_scores[player_id]}")

# Atsitiktinės žinutės funkcija (žaidimo veiksmai)
async def random_action(update: Update, context: CallbackContext):
    player_id = update.message.from_user.id
    if player_id not in player_scores:
        player_scores[player_id] = 0  # Užtikriname, kad žaidėjas turi pradinius taškus
    
    actions = ["Jūs radote lobį ir gavote 10 taškų!", "Jūs pralaimėjote mūšį ir praradote 5 taškus.",
               "Jūs padėjote kaimynui ir gavote 3 taškus!", "Jūs pasivaikščiojote ir uždirbote 1 tašką."]
    result = random.choice(actions)

    if "praradote" in result:
        points_change = -5
    else:
        points_change = 10 if "radote" in result else 1 if "pasivaikščiojote" in result else 3

    player_scores[player_id] += points_change

    # Atsakome su atsitiktine žinute ir atnaujiname taškus
    await update.message.reply_text(f"{result} Jūsų bendri taškai: {player_scores[player_id]}")

# Parodyti taškus
async def show_score(update: Update, context: CallbackContext):
    player_id = update.message.from_user.id
    if player_id not in player_scores:
        player_scores[player_id] = 0  # Jei žaidėjas neturi taškų
    await update.message.reply_text(f"Jūsų taškai: {player_scores[player_id]}")

# Funkcija, kuri sukonfigūruoja botą ir pradeda jį
def main():
    # Įdėkite savo Telegram bot'o API raktą
    application = Application.builder().token("7888214552:AAH7Ucj_sBh6cmCupoeTcTP8_8k9Hu1L1ZQ").build()

    # Pridėkite komandas
    application.add_handler(CommandHandler("start", start))  # /start komanda
    application.add_handler(CommandHandler("score", show_score))  # /score komanda, kad parodyti taškus
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, random_action))  # Žinutės, kurios suaktyvuoja žaidimą

    # Paleiskite botą, kad jis pradėtų klausytis žinučių
    application.run_polling()

# Jei ši programa paleidžiama tiesiogiai, pradėkite bot'ą
if __name__ == '__main__':
    main()
