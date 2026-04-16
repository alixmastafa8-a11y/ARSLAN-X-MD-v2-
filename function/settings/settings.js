import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*
═══════════════════════════════════════
   ARSLAN X MD — BOT SETTINGS
   Official WhatsApp Mini Bot
═══════════════════════════════════════
*/

global.setting = {
  clearSesi: false,    // Auto-clear session trash
  clearTmp: true,      // Auto-clear tmp folder
  addReply: true,      // Show thumbnail in messages
  idgc: '120363424932450219@g.us'  // Group ID for join-only
}

global.info = {
  nomerbot: '212675617959',
  pairingNumber: '212675617959',
  figlet: 'ARSLAN X MD',           // Console banner text
  nomorwa: '212675617959',
  nameown: 'ARSLAN',
  nomerown: '212635538684',
  packname: 'Sticker by ',
  author: 'ARSLAN X MD',
  namebot: '⚡ ARSLAN X MD',
  wm: '© ARSLAN X MD',
  stickpack: 'WhatsApp',
  stickauth: 'ARSLAN X MD',
  jid: '@s.whatsapp.net'
}

// Media / Thumbnails
global.media = {
  ppKosong: 'https://files.catbox.moe/y6dg4l.jpg',
  didyou: 'https://files.catbox.moe/y6dg4l.jpg',
  rulesBot: 'https://files.catbox.moe/y6dg4l.jpg',
  thumbnail: 'https://files.catbox.moe/y6dg4l.jpg',
  thumb: 'https://files.catbox.moe/y6dg4l.jpg',
  logo: 'https://files.catbox.moe/y6dg4l.jpg',
  unReg: 'https://files.catbox.moe/y6dg4l.jpg',
  registrasi: 'https://files.catbox.moe/y6dg4l.jpg',
  confess: 'https://files.catbox.moe/y6dg4l.jpg',
  access: 'https://files.catbox.moe/y6dg4l.jpg',
  tqto: 'https://files.catbox.moe/y6dg4l.jpg',
  spotify: 'https://files.catbox.moe/y6dg4l.jpg',
  weather: 'https://files.catbox.moe/y6dg4l.jpg',
  gempaUrl: 'https://files.catbox.moe/y6dg4l.jpg',
  akses: 'https://files.catbox.moe/y6dg4l.jpg',
  wel: 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4',
  good: 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4',
  sound: 'https://pomf2.lain.la/f/ymca9u8.opus'
}

// Social Media Links
global.url = {
  sig: 'https://github.com/Arslan-md',
  sgh: 'https://github.com/Arslan-md',
  sgc: 'https://github.com/Arslan-md'
}

// Payment / Donation
global.payment = {
  psaweria: 'https://saweria.co/arslan',
  ptrakterr: '-',
  pdana: '0000000000'
}

// Bot Messages
global.msg = {
  wait: '⏳ *Please wait...*\n> Processing your request...',
  eror: '🤖 *Bot Error*\n> Sorry, an error occurred while executing the command. Please try again.'
}

// API IDs
global.apiId = {
  smm: '4524',
  lapak: '300672'
}

// API Keys
global.api = {
  user: '-',
  screet: '-',
  uptime: '-',
  xyro: '-',
  lol: 'GataDiosV2',
  smm: '-',
  lapak: '-',
  prodia: '-',
  bing: 'YOUR_BING_API_KEY'
}

global.APIs = {
  xyro: 'https://api.xyroinee.xyz',
  nightTeam: 'https://api.tioxy.my.id',
  lol: 'https://api.lolhumaan.xyz',
  smm: 'https://smmnusantara.id',
  lapak: 'https://panel.lapaksosmed.com'
}

global.APIKeys = {
  'https://api.xyroinee.xyz': 'vRFLiyLPWu',
  'https://api.lolhumaan.xyz': 'GataDiosV2'
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("⚡ settings.js updated"))
  import(`${file}?update=${Date.now()}`)
})
