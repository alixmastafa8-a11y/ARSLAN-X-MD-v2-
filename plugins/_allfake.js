import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
import axios from "axios";
import speed from "performance-now";

let handler = (m) => m;
handler.all = async function (m) {
  let name = await conn.getName(m.sender);
  let pp = "https://files.catbox.moe/tynb2g.jpg";
  let fotonyu = "https://files.catbox.moe/tynb2g.jpg";
  let logo = "https://files.catbox.moe/tynb2g.jpg"; 
  let namebot = "ARSLAN-X";
  let sig = "https://whatsapp.com/channel/0029Vb7obv8Fy72937jJb32V";

  try {
  } catch (e) {
    console.error(e);
  } finally {
    global.emror = "https://files.catbox.moe/tynb2g.jpg";

    global.doc = pickRandom([
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/pdf",
    ]);
    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000]);

    global.axios = (await import("axios")).default;
    global.fetch = (await import("node-fetch")).default;
    global.cheerio = (await import("cheerio")).default;
    global.fs = (await import("fs")).default;

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let ms = await latensi.toFixed(4);
    const _uptime = process.uptime() * 1000;

    global.kontak2 = [
      [
        owner[0],
        await conn.getName("212635538684@s.whatsapp.net"),
        "ARSLAN-X 乂",
        "https://whatsapp.com",
        true,
      ],
    ];

    global.fkon = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat
          ? {
              remoteJid: "BROADCAST GROUP",
            }
          : {}),
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    global.fVerif = {
      key: {
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net",
      },
      message: {
        conversation: `_『 ${namebot} 』- Verified by WhatsApp_`,
      },
    };

    global.ephemeral = "86400";

    global.ucapan = ucapan();
    global.botdate = date();

    global.adReply = {
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363424932450219@newsletter",
          serverMessageId: 103,
          newsletterName: `ARSLAN-X ┫ Multi-Device Bot 乂`,
        },
        externalAdReply: {
          title: namebot,
          body: global.ucapan,
          thumbnailUrl: logo,
          sourceUrl: sig,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    };

    global.fakeig = {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: namebot,
          body: ucapan(),
          thumbnailUrl: pp,
          sourceUrl: sig,
        },
      },
    };
  }
};

export default handler;

function date() {
  let d = new Date(new Date() + 3600000);
  let locale = "en";
  let week = d.toLocaleDateString(locale, {
    weekday: "long",
  });
  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let tgl = `${week}, ${date}`;
  return tgl;
}

function ucapan() {
  const time = moment.tz("Africa/Casablanca").format("HH");
  let res = "Have a nice day with ARSLAN-X 乂";
  if (time >= 4) {
    res = "Good Morning 🌤️";
  }
  if (time > 10) {
    res = "Good Day ☀️";
  }
  if (time >= 15) {
    res = "Good Afternoon 🌆";
  }
  if (time >= 18) {
    res = "Good Night 🌙";
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
