let handler = async (m, { conn, text, usedPrefix, command }) => {

  try {
    const query = text ? text.trim() : '';

    if (!query) {
      return m.reply(
        `╭─── 「 **YT PLAY** 」 ───乂\n` +
        `│\n` +
        `│ ❌ *Please provide a song name or link!*\n` +
        `│\n` +
        `│ *Example:*\n` +
        `│ ${usedPrefix + command} Alone Alan Walker\n` +
        `│\n` +
        `╰──────────────────• 乂`
      );
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    if (query.length > 100) {
      return m.reply(
        `╭─── 「 **REQUEST ERROR** 」 ───乂\n` +
        `│\n` +
        `│ ⚠️ *Query too long! Max 100 characters.*\n` +
        `│\n` +
        `╰──────────────────• 乂`
      );
    }

    const response = await fetch(`https://api.nexray.web.id/downloader/ytplay?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.status || !data.result?.download_url) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return m.reply(
        `╭─── 「 **NOT FOUND** 」 ───乂\n` +
        `│\n` +
        `│ ❌ *No results found for:* "${query}"\n` +
        `│ Try a different name or link.\n` +
        `│\n` +
        `╰──────────────────• 乂`
      );
    }

    const result     = data.result;
    const audioUrl   = result.download_url;
    const filename   = result.title    || 'Unknown Audio';
    const thumbnail  = result.thumbnail || '';
    const sourceUrl  = result.url       || '';
    const duration   = result.duration  || '';
    const views      = result.views     || '';
    const channel    = result.channel   || '';

    await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } });

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${filename}.mp3`,
      contextInfo: thumbnail ? {
        externalAdReply: {
          title: filename.substring(0, 30),
          body: `ARSLAN-X • ${duration} • ${views} views`,
          thumbnailUrl: thumbnail,
          sourceUrl: sourceUrl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      } : undefined,
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      document: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${filename.replace(/[<>:"/\\|?*]/g, '_')}.mp3`,
      caption:
        `╭─── 「 **DOWNLOADED** 」 ───乂\n` +
        `│\n` +
        `│ 🎵 **Title:** ${filename}\n` +
        `│ ⏱️ **Duration:** ${duration}\n` +
        `│ 👁️ **Views:** ${views}\n` +
        `│ 📺 **Channel:** ${channel}\n` +
        `│\n` +
        `│ ✅ **Enjoy the music!**\n` +
        `╰──────────────────• 乂`
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('Play error:', error);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    await m.reply(
      `╭─── 「 **SYSTEM ERROR** 」 ───乂\n` +
      `│\n` +
      `│ ❌ *An unexpected error occurred.*\n` +
      `│ **Reason:** ${error.message}\n` +
      `│\n` +
      `╰──────────────────• 乂`
    );
  }
};

handler.help = ['play'];
handler.command = /^(play|audio|song)$/i;
handler.tags = ['downloader'];
handler.limit = true;

export default handler;
        
