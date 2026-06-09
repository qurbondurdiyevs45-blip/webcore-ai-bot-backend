const { Telegraf } = require('telegraf'); // yoki siz qaysi kutubxonadan foydalangan bo'lsangiz (masalan, node-telegram-bot-api)
const express = require('express');

// 1. Telegram Botni ulash
// BotFather'dan olgan tokeningizni shu yerga qo'ying yoki Render'ning Environment Variables bo'limiga kiriting
const bot = new Telegraf(process.env.BOT_TOKEN || 'BU_YERGA_TELEGRAM_TOKENINGIZNI_QO_YING');

// Botga kelgan so'rovlarni boshqarish (Siz yozgan kodlar)
bot.start((ctx) => ctx.reply('Salom! Men har doim yoniq turadigan WebCore AI botman! 🚀'));
bot.on('text', (ctx) => {
    const userMessage = ctx.message.text;
    ctx.reply(`Siz yozdingiz: ${userMessage}`);
});

// Botni ishga tushirish (Polling usulida)
bot.launch().then(() => {
    console.log('Telegram bot muvaffaqiyatli ishga tushdi...');
});


// ==========================================
// RENDER O'CHIB QOLMASLIGI UCHUN EXPRESS SERVER
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000; // Render o'zi avtomatik port beradi

app.get('/', (req, res) => {
    res.send('Bot status: Active and Running 24/7!');
});

app.listen(PORT, () => {
    console.log(`Express server portda ishlamoqda: ${PORT}`);
});
// ==========================================