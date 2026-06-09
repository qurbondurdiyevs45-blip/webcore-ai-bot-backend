const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8773923823:AAGVGFAe0pqgkPZPDr5iJudWp9LRZZCljsA'; 
const bot = new TelegramBot(token, { polling: true });

const SYSTEM_INSTRUCTION = `
Sen foydalanuvchining eng yaqin, samimiy va juda aqlli AI hamkorisan. Har qanday xabarga juda tez va kechikishlarsiz javob qaytar. Foydalanuvchi so‘ragan narsani shunchaki quruq yozmasdan, juda aniq, batafsil, tushunarli qilib uzaytirib tushuntirib ber.
Foydalanuvchi nusxalab olishi (copy qilishi) oson bo‘lishi uchun kodlarni yoki muhim matnlarni alohida tayyor kod bloklari (\`\`\`) ichida taqdim et. Matn ichida sarlavhalar (##), chiziqlar (---), qalin yozuvlar (**...**) va mos keladigan emojilardan juda faol foydalan. Har bir javobingning oxirida mavzuga mos bitta qiziqarli va aniq savol yozib ket.
`;

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, "## 🚀 WebCore AI Botga Xush Kelibsiz!\n\nMen har doim onlaynman va sizga yordam berishga tayyorman. Menga ixtiyoriy savolingizni bering! 😊");
  } else {
    bot.sendMessage(chatId, `## 🤖 AI Yordamchisi\n\nSizning savolingiz qabul qilindi: "${text}"\n\nServer 24/7 rejimda ishlamoqda, shuning uchun noutbuk o'chsa ham men javob beraman! 🎉\n\n---\n*Sizga boshqa qanday yordam bera olaman?*`, { parse_mode: 'Markdown' });
  }
});

const app = express();
app.get('/', (req, res) => res.send('Bot Status: 24/7 Active!'));
app.listen(process.env.PORT || 3000);
