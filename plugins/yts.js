import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `╭─── 「 **YOUTUBE SEARCH** 」 ───乂\n│\n│ 🔍 *Please provide a search query!*\n│\n│ *Example:*\n│ ${usedPrefix}${command} Alone Alan Walker\n│\n╰──────────────────• 乂`
  
  await conn.reply(m.chat, global.wait, m)
  
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `🎬 *_${v.title}_*\n🔗 *_Link :_* ${v.url}\n🕒 *_Duration :_* ${v.timestamp}\n📅 *_Uploaded :_* ${v.ago}\n👁 *_Views :_* ${v.views}`
    }
  }).filter(v => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n')
  
  let finalCaption = `╭─── 「 **SEARCH RESULTS** 」 ───乂\n\n${teks}\n\n╰──────────────────• 乂`
  
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', finalCaption, m)
}

handler.help = ['yts'] 
handler.tags = ['search']
handler.command = ['yts', 'ytsearch'] 
handler.limit = 1

export default handler
    
