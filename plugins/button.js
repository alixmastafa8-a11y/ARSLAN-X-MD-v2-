let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const menu = global.db.data.settings[conn.user.jid]
  let menus = ['text', 'document', 'image', 'gif', 'button']
  let gc = ['grouptext', 'groupimage', 'groupdoc', 'groupgif']

  let isiMenu = []
  let isiGrup = []

  for (let pus of menus) {
    isiMenu.push({
      header: 'Template ' + pus,
      title: '🖼️ Menu Style: ' + pus,
      description: '',
      id: usedPrefix + 'template ' + pus,
    })
  }
  for (let pus2 of gc) {
    isiGrup.push({
      header: 'Template ' + pus2,
      title: '👋 Welcome/Goodbye Style: ' + pus2,
      description: '',
      id: usedPrefix + 'template ' + pus2,
    })
  }

  let type = (args[0] || '').toLowerCase()

  switch (type) {
    case 'image':
      menu.image = true; menu.gif = false; menu.teks = false; menu.doc = false; menu.button = false
      m.reply('✅ Menu template changed to *Image*')
      break
    case 'gif':
      menu.image = false; menu.gif = true; menu.teks = false; menu.doc = false; menu.button = false
      m.reply('✅ Menu template changed to *GIF*')
      break
    case 'text': case 'teks':
      menu.image = false; menu.gif = false; menu.teks = true; menu.doc = false; menu.button = false
      m.reply('✅ Menu template changed to *Text*')
      break
    case 'doc': case 'document':
      menu.image = false; menu.gif = false; menu.teks = false; menu.doc = true; menu.button = false
      m.reply('✅ Menu template changed to *Document*')
      break
    case 'button':
      menu.image = false; menu.gif = false; menu.teks = false; menu.doc = false; menu.button = true
      m.reply('✅ Menu template changed to *Button*')
      break
    case 'groupimage': case 'grupimg':
      menu.gcImg = true; menu.gcGif = false; menu.gcTeks = false; menu.gcDoc = false
      m.reply('✅ Group template changed to *Welcome/Goodbye Image*')
      break
    case 'groupgif': case 'grupgif':
      menu.gcImg = false; menu.gcGif = true; menu.gcTeks = false; menu.gcDoc = false
      m.reply('✅ Group template changed to *Welcome/Goodbye GIF*')
      break
    case 'grouptext': case 'grupteks':
      menu.gcImg = false; menu.gcGif = false; menu.gcTeks = true; menu.gcDoc = false
      m.reply('✅ Group template changed to *Welcome/Goodbye Text*')
      break
    case 'groupdoc': case 'grupdoc':
      menu.gcImg = false; menu.gcGif = false; menu.gcTeks = false; menu.gcDoc = true
      m.reply('✅ Group template changed to *Welcome/Goodbye Document*')
      break
    default:
      const data = {
        title: '⚡ ARSLAN X MD — Templates',
        sections: [
          {
            title: '🖼️ Menu Template Styles',
            highlight_label: 'New',
            rows: [...isiMenu],
          },
          {
            title: '👥 Group Event Templates',
            highlight_label: 'Hot',
            rows: [...isiGrup]
          }
        ]
      }
      return conn.sendListButton(m.chat,
        '⚙️ Select a template style for the menu and group events.',
        data,
        global.wm
      )
  }
}

handler.help = ['image', 'gif', 'text', 'doc', 'button'].map(v => `template ${v}`)
handler.tags = ['owner']
handler.command = /^(template)$/i
handler.group = false
handler.rowner = true
export default handler
