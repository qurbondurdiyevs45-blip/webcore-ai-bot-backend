const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// 1. Telegram Bot Sozlamalari (Token Render-dan xavfsiz olinadi)
const token = process.env.BOT_TOKEN; 
const bot = new TelegramBot(token, { polling: true });

// 2. AI uchun qat'iy buyruq (Prompt)
const AI_INSTRUCTION = "Sen Telegram botisan. Foydalanuvchi savoliga har doim faqat bitta, eng to‘g‘ri, qisqa va annaq javobni berishing shart. Hech qanday variantlar, ro‘yxatlar, uzun tavsiyalar va cho‘zib tushuntirishlar yozma. Savolga lo‘nda qilib, maksimal 1-2 ta gap bilan darhol javob qaytar.";

// 3. Botga xabar kelganda ishlaydigan qism
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text === '/start') {
    return bot.sendMessage(chatId, "Salom! Men WebCore AI botman. Savolingizni bering, qisqa va lo'nda javob beraman! 🚀");
  }

  try {
    // Kelajakda bu yerga sun'iy intellekt API (masalan, OpenAI yoki Google Gemini) ulanadi
    const aiResponse = `[AI Javobi]: Savolingiz qabul qilindi. AI tizimi yoqilmoqda...`; 
    bot.sendMessage(chatId, aiResponse);
  } catch (error) {
    bot.sendMessage(chatId, "Xatolik yuz berdi, qaytadan urinib ko'ring.");
  }
});

console.log("WebCore AI Bot muvaffaqiyatli ishga tushdi...");

// =============================================================
// RENDER SERVERI O'CHIB QOLMASLIGI UCHUN EXPRESS SERVER
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => { 
  res.send('Bot Status: Active and Running 24/7'); 
});

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});