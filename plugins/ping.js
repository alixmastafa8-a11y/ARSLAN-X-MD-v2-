let handler = async (m, { conn }) => {
  const start = Date.now()
  await conn.reply(m.chat, '⚡ *Pinging...*', m)
  const end = Date.now()
  const ping = end - start

  let speed = ping < 300 ? '🟢 Fast' : ping < 700 ? '🟡 Normal' : '🔴 Slow'

  await conn.reply(m.chat,
`╔══════════════════════╗
║   ⚡  ARSLAN X MD   ║
╚══════════════════════╝

🏓 *Ping:* ${ping} ms
📶 *Speed:* ${speed}
🤖 *Bot:* Online ✅
🕐 *Response Time:* ${ping}ms

© ARSLAN X MD`, m)
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = /^(ping|speed|alive|test)$/i
export default handler
