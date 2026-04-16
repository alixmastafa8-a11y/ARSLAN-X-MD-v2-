import axios from 'axios';

let handler = async (m, { conn, text, command, usedPrefix }) => {
    
    if (!m.text.startsWith('.') && 
        !m.text.startsWith('/') && 
        !m.text.startsWith('!') && 
        !m.text.startsWith('#')) {
        return;
    }

    if (!text) {
        await conn.sendMessage(m.chat, {
            text: `『 ARSLAN-X 』\n\n🔍 *Please provide an app name to search!*\n\n📌 *Example:* .${command} Facebook`
        }, { quoted: m });
        return; 
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiUrl = `https://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(text)}&limit=1`;
        
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.datalist || !data.datalist.list || !data.datalist.list.length) {
            await conn.sendMessage(m.chat, {
                text: "『 ARSLAN-X 』\n\n❌ *Result not found. Please check the name.*"
            }, { quoted: m });
            return; 
        }

        const app = data.datalist.list[0];
        const sizeMB = (app.size / (1024 * 1024)).toFixed(2);

        const caption = `
╭─── 「 **APK DOWNLOADER** 」 ───乂
│
│ 🎮 **Name:** ${app.name}
│ 📦 **Package:** ${app.package}
│ 📅 **Updated:** ${app.updated}
│ 📁 **Size:** ${sizeMB} MB
│
╰──────────────────• 乂`.trim();

        await conn.sendMessage(m.chat, {
            image: { url: app.icon },
            caption: `『 ARSLAN-X 』\n\n🖼️ **App Icon:**\n*${app.name}*`,
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: "📥", key: m.key } });

        await conn.sendMessage(m.chat, {
            document: { url: app.file.path_alt || app.file.path },
            fileName: `${app.name}.apk`,
            mimetype: 'application/vnd.android.package-archive',
            caption: caption,
            contextInfo: {
                externalAdReply: {
                    title: app.name,
                    body: "ARSLAN-X 乂",
                    mediaType: 1,
                    sourceUrl: app.file.path_alt || app.file.path,
                    thumbnailUrl: app.icon,
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            } 
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (e) {
        await conn.sendMessage(m.chat, { 
            text: `『 ERROR 乂 SYSTEM 』\n\n❌ ${e.message}` 
        }, { quoted: m });
    }
}

handler.help = ['apk2'];
handler.command = ['apk2', 'app2', 'program2']; 
handler.tags = ['downloader'];
handler.limit = true;

export default handler;
