exports.handler = async (event) => {
    // Faqat POST so'rovlarni qabul qilamiz (Telegram shunday yuboradi)
    if (event.httpMethod !== "POST") {
        return { statusCode: 200, body: "Server ishlamoqda..." };
    }

    try {
        // Havoladan Gemini API kalitini ajratib olamiz
        const apiKey = event.queryStringParameters.api_key;
        // Havoladan Telegram bot tokenini aniqlaymiz
        const token = event.path.split('/').pop() || event.headers["referer"] || ""; 
        
        // Agar aniqlay olmasak, funksiya yo'lidan qidiramiz
        const botToken = event.path.match(/bot(.*)/) ? event.path.split('/').pop() : null;

        const body = JSON.parse(event.body);

        // Agar kelgan xabarda matn bo'lsa
        if (body.message && body.message.text) {
            const chatId = body.message.chat.id;
            const userText = body.message.text;

            // 1. Telegram tokenini avtomatik aniqlash (xavfsizlik uchun dinamik)
            // Agar dynamic aniqlay olmasak, manager orqali kelgan havoladan to'g'rilaymiz
            const currentToken = event.path.includes('functions/bot') ? event.headers["x-tg-token"] || "" : token;

            // Gemini AI modeliga so'rov yuborish
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const aiResponse = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userText }] }],
                    systemInstruction: {
                        parts: [{ text: "Sen aqlli, bilimdon va yordamchi AI botsan. Foydalanuvchining har qanday savoliga har doim faqat o'zbek tilida, juda samimiy, aniq va tushunarli qilib mukammal javob ber." }]
                    }
                })
            });

            const aiData = await aiResponse.json();
            let replyText = "Uzr, aqlli tizim javob bera olmadi.";
            
            if (aiData.candidates && aiData.candidates[0].content.parts[0].text) {
                replyText = aiData.candidates[0].content.parts[0].text;
            }

            // Telegramga javob qaytarish (Bu yerda token url tarkibidan keladi)
            const tgToken = event.headers["referer"] ? event.headers["referer"].match(/bot([^/]+)/)[1] : "";
            
            // Xabarni yuborish (Dinamik ulanish)
            // Telegram URL manzilini to'g'rilash uchun biz sozlash oynasidagi tokendan foydalanamiz
            // Lekin eng oson yo'li: Webhook o'rnatilganda buni aniq ko'rsatish
        }

        return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
    } catch (error) {
        console.error("Server xatoligi:", error);
        return { statusCode: 200, body: JSON.stringify({ error: error.message }) };
    }
};