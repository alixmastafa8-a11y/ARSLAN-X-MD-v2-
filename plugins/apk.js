import axios from 'axios';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { exec } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const pipelineAsync = promisify(pipeline);

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: `『 ARSLAN-X 』\n\n🔍 *Please provide an app name to search!*\n\n📌 *Example:* .${command} Facebook` }, { quoted: m });
    return;
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "⬇️", key: m.key } });
    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(text)}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.datalist || !data.datalist.list || !data.datalist.list.length) {
      await conn.sendMessage(m.chat, { text: "『 ARSLAN-X 』\n\n❌ *Result not found.*" }, { quoted: m });
      return;
    }

    const app = data.datalist.list[0];
    const sizeMB = (app.size / (1024 * 1024)).toFixed(2);

    if (sizeMB > 260) {
      await conn.sendMessage(m.chat, { text: `『 ARSLAN-X 』\n\n❌ *File too large: ${sizeMB}MB*\n📌 *Max limit: 260MB*` }, { quoted: m });
      return;
    }

    const tmpFilePath = join(tmpdir(), `${app.name}.apk`);
    const zipFilePath = join(tmpdir(), `${app.name}.zip`);

    const writer = createWriteStream(tmpFilePath);
    const responseStream = await axios.get(app.file.path_alt, { responseType: 'stream' });
    await pipelineAsync(responseStream.data, writer);

    await new Promise((resolve, reject) => {
      exec(`zip -j ${zipFilePath} ${tmpFilePath}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await conn.sendMessage(m.chat, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(m.chat, {
      document: createReadStream(zipFilePath),
      fileName: `${app.name}.zip`,
      mimetype: 'application/zip'
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: `『 ERROR 乂 SYSTEM 』\n\n❌ ${e.message}` }, { quoted: m });
  }
}

handler.help = ['apk1'];
handler.command = ['apk1'];
handler.tags = ['downloader'];
handler.limit = true;
handler.args = true;

export default handler;
