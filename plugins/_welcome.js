import { WAMessageStubType } from '@adiwajshing/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.isGroup || !m.messageStubType) return true

  const dev = 'ARSLAN-X'

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "ARSLAN-X"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${dev}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  const stubParams = m.messageStubParameters || []
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true

  let chat = global.db.data.chats[m.chat] || {}
  if (typeof chat.welcome === 'undefined') chat.welcome = true
  if (!chat.welcome) return true

  const userJid = stubParams[0]
  const username = userJid.split('@')[0]
  const mention = '@' + username

  const initialMemberCount = groupMetadata.participants?.length || 0

  let avatar
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image')
  } catch {
    avatar = 'https://i.imgur.com/8B4QYQY.png'
  }

  const guildName = encodeURIComponent(groupMetadata.subject)
  const apiBase = "https://api.siputzx.my.id/api/canvas"
  const backgroundUrl = encodeURIComponent('https://files.catbox.moe/zzi53m.jpg')

  async function fetchImage(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('API Error')
      return await res.buffer()
    } catch (e) {
      console.error(e)
      const fallbackRes = await fetch(avatar)
      return await fallbackRes.buffer()
    }
  }

  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_INVITE
  ) {
    const memberCount = initialMemberCount
    const defaultWelcome = `╭─── 「 **NEW MEMBER** 」 ───乂
│
│ 『 **Welcome:** @user 』
│ 『 **Group:** @subject 』
│
│ ⚔️ I am **${dev}**!
│ 👥 **Total Members:** ${memberCount}
│ 📜 **Read group rules to avoid kick!**
│ 🧭 Type *.menu* to see my commands.
│
╰──────────────────• 乂`

    const bienvenida = (chat.welcomeText || defaultWelcome)
      .replace('@user', mention)
      .replace('@subject', groupMetadata.subject)
      .replace('@desc', groupMetadata.desc?.toString() || 'No description')

    const welcomeApiUrl = `${apiBase}/welcomev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`
    let imgBuffer = await fetchImage(welcomeApiUrl)

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: bienvenida,
      mentions: [userJid]
    }, { quoted: fkontak })
  }

  else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
  ) {
    const memberCount = initialMemberCount - 1
    const defaultBye = `╭─── 「 **MEMBER LEFT** 」 ───乂
│
│ 💔 **Goodbye:** @user
│ 🏃‍♂️ **Left from:** @subject
│ 👥 **Remaining Members:** ${memberCount}
│
╰──────────────────• 乂`

    const despedida = (chat.byeText || defaultBye)
      .replace('@user', mention)
      .replace('@subject', groupMetadata.subject)

    const goodbyeApiUrl = `${apiBase}/goodbyev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`
    let imgBuffer = await fetchImage(goodbyeApiUrl)

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: despedida,
      mentions: [userJid]
    }, { quoted: fkontak })
  }

  return true
}
