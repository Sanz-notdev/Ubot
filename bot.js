const config = require("./config");
const fs = require("fs");
const axios = require("axios");
const prefix = config.prefix || ".";
const os = require("os");

function escapeMarkdown(text) {
  if (!text || typeof text !== 'string') return '';
  let escaped = text.toString();
  const specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
  specialChars.forEach(char => {
    const regex = new RegExp(`\\${char}`, 'g');
    escaped = escaped.replace(regex, `\\${char}`);
  });
  return escaped;
}

const getMenuText = (ctx) => {
  const start = process.hrtime.bigint();
  const end = process.hrtime.bigint();
  const speed = Number(end - start) / 1e6;
  const used = (process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2);
  const total = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const ownTag = `[${escapeMarkdown(config.ownerName)}](tg://user?id=${config.ownerId})`
  return `
👋 Hello! welcome to *${config.botName}* bot version ${config.version}

⌯ Speed: ${speed}ms
⌯ Runtime: ${runtime(process.uptime())}
⌯ Botmode: ${global.selfMode ? "Self" : "Public"}
⌯ Developer: ${ownTag}
⌯ Prefix: [${config.prefix}]
⌯ Libray: Telegraf

_─ Development by ${config.ownerName}._
`;
};

const getStoreMenu = () => `
⌯ ${prefix}cfd
⌯ ${prefix}bcuser
⌯ ${prefix}bcgc
⌯ ${prefix}stopbc
⌯ ${prefix}bl
⌯ ${prefix}delbl
⌯ ${prefix}proses
⌯ ${prefix}pay
`;

const getPanelMenu = () => `
⌯ ${prefix}1gb
⌯ ${prefix}2gb
⌯ ${prefix}3gb
⌯ ${prefix}4gb
⌯ ${prefix}5gb
⌯ ${prefix}6gb
⌯ ${prefix}7gb
⌯ ${prefix}8gb
⌯ ${prefix}9gb
⌯ ${prefix}10gb
⌯ ${prefix}unli
⌯ ${prefix}listpanel
⌯ ${prefix}delpanel
⌯ ${prefix}cadmin
⌯ ${prefix}listadmin
⌯ ${prefix}deladmin
⌯ ${prefix}subdo
⌯ ${prefix}installpanel
⌯ ${prefix}startwings
⌯ ${prefix}uninstallpanel
`;

const getOwnerMenu = () => `
⌯ ${prefix}backup
⌯ ${prefix}restart
⌯ ${prefix}self / ${prefix}public
⌯ ${prefix}eval
⌯ ${prefix}cleardb
`;

const getSearchMenu = () => `
⌯ ${prefix}pinterest
⌯ ${prefix}bokep
⌯ ${prefix}nsfw
⌯ ${prefix}waifu
`;

const getToolsMenu = () => `
⌯ ${prefix}ai
⌯ ${prefix}encjs
⌯ ${prefix}cleardns
⌯ ${prefix}me
⌯ ${prefix}tourl
⌯ ${prefix}tourl2
⌯ ${prefix}tohd
⌯ ${prefix}telanjang
⌯ ${prefix}jadianime
⌯ ${prefix}ping
`;

const getDownloadMenu = () => `
⌯ ${prefix}tiktok
⌯ ${prefix}ttmp3
⌯ ${prefix}ytmp3
⌯ ${prefix}play
⌯ ${prefix}npmdl
⌯ ${prefix}spotify
⌯ ${prefix}gitclone
⌯ ${prefix}mediafire
`;

const isOwner = (ctx) => {
  const fromId = ctx.from?.id || ctx.callbackQuery?.from?.id || ctx.inlineQuery?.from?.id;
  const botId = ctx.botInfo?.id;
  return String(fromId) === String(config.ownerId) || String(fromId) === String(botId);
};

module.exports = (bot) => {
  bot.on("inline_query", async (ctx) => {
    try {
      const msg = ctx.inlineQuery;
      const body = (msg.query || "").trim();
      const isCmd = body.startsWith(prefix);
      const args = body.split(/ +/).slice(1);
      const text = args.join(" ");
      const command = isCmd ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase() : body.toLowerCase();

      function getCacheData(cacheId) {
        if (!cacheId) return null;
        const data = global.tempData?.[cacheId];
        if (data) {
          delete global.tempData[cacheId];
        }
        return data;
      }

      switch (command) {
        case "menu": {
          return ctx.answerInlineQuery([
            {
              type: "photo",
              id: "menu-1",
              photo_url: config.menuImage || "https://telegra.ph/file/1c2a9e2b3d4e5f6a7b8c9.jpg",
              thumb_url: config.menuImage || "https://telegra.ph/file/1c2a9e2b3d4e5f6a7b8c9.jpg",
              caption: getMenuText(ctx),
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Storemenu", callback_data: "menu:store" },
                    { text: "Panelmenu", callback_data: "menu:panel" }
                  ],
                  [
                    { text: "Ownermenu", callback_data: "menu:owner" },
                    { text: "Toolsmenu", callback_data: "menu:tools" }
                  ],
                  [
                    { text: "Downloadmenu", callback_data: "menu:download" }, 
                    { text: "Searchmenu", callback_data: "menu:search" }
                  ],                  
                  [
                    { text: "🌟 Channel Information", url: config.channelLink }
                  ]
                ]
              }
            }
          ], { cache_time: 0 });
        }

        case "menu-store":
        case "store": {
          return ctx.answerInlineQuery([
            {
              type: "article",
              id: "store-1",
              title: "Store Menu",
              description: "Menu store commands",
              input_message_content: {
                message_text: getStoreMenu(),
                parse_mode: "Markdown"
              },
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }],
                ]
              }
            }
          ], { cache_time: 0 });
        }

        case "menu-panel":
        case "panel": {
          return ctx.answerInlineQuery([
            {
              type: "article",
              id: "panel-1",
              title: "Panel Menu",
              description: "Menu panel commands",
              input_message_content: {
                message_text: getPanelMenu(),
                parse_mode: "Markdown"
              },
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            }
          ], { cache_time: 0 });
        }

        case "menu-owner":
        case "owner": {
          return ctx.answerInlineQuery([
            {
              type: "article",
              id: "owner-1",
              title: "Owner Menu",
              description: "Owner only commands",
              input_message_content: {
                message_text: getOwnerMenu(),
                parse_mode: "Markdown"
              },
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            }
          ], { cache_time: 0 });
        }

        case "menu-tools":
        case "tools": {
          return ctx.answerInlineQuery([
            {
              type: "article",
              id: "tools-1",
              title: "Tools Menu",
              description: "Tools commands",
              input_message_content: {
                message_text: getToolsMenu(),
                parse_mode: "Markdown"
              },
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            }
          ], { cache_time: 0 });
        }

        case "menu-payment":
        case "payment": {
          const caption = `\n*List payment pembayaran 🔖*\n` +
            `\n⌯ *Dana:* \`${config.payment.dana || "-"}\`\n` +
            `⌯ *Ovo:* \`${config.payment.ovo || "-"}\`\n` +
            `⌯ *Gopay:* \`${config.payment.gopay || "-"}\`\n` +
            `\n*Penting:* wajib kirimkan bukti tf! demi keamanan bersama.`

          if (config.payment?.qris) {
            return ctx.answerInlineQuery([
              {
                type: "photo",
                id: "payment-1",
                photo_url: config.payment.qris,
                thumb_url: config.payment.qris,
                caption: caption,
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [{ text: "🌟 Channel Information", url: config.channelLink }]
                  ]
                }
              }
            ], { cache_time: 0 });
          } else {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "payment-2",
                title: "Payment Info",
                description: "Payment information",
                input_message_content: {
                  message_text: caption,
                  parse_mode: "Markdown"
                },
                reply_markup: {
                  inline_keyboard: [
                    [{ text: "🌟 Channel Information", url: config.channelLink }]
                  ]
                }
              }
            ], { cache_time: 0 });
          }
        }

        case "cpanel-result": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan atau sudah kadaluarsa",
                input_message_content: {
                  message_text: "❌ Data panel tidak ditemukan atau sudah kadaluarsa.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { username, password, serverId, ram, disk, cpu, domainClean } = cacheData;
          const ramText = ram === "0" ? "Unlimited" : `${ram / 1000}GB`;
          const diskText = disk === "0" ? "Unlimited" : `${disk / 1000}GB`;
          const cpuText = cpu === "0" ? "Unlimited" : `${cpu}%`;
          const teks = `
✅ <b>Akun Panel Berhasil Dibuat!</b>

⌯ Server ID: <code>${serverId}</code>
⌯ Username: <code>${username}</code>
⌯ Password: <code>${password}</code>
⌯ Panel: <span class="tg-spoiler">https://${domainClean}</span>

⚙️ <b>Spesifikasi Server Panel</b>
⌯ RAM: ${ramText}
⌯ Disk: ${diskText}
⌯ CPU: ${cpuText}
`;
          return ctx.answerInlineQuery([{
            type: "article",
            id: "panel-result-1",
            title: "📦 Panel Created",
            description: `Panel ${username} created!`,
            input_message_content: {
              message_text: teks,
              parse_mode: "HTML",
              disable_web_page_preview: true
            },
            reply_markup: {
              inline_keyboard: [
                [{ text: "🌐 Login Panel", url: `https://${domainClean}/auth/login` }]
              ]
            }
          }], { cache_time: 0 });
        }

        case "cadmin-result": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan atau sudah kadaluarsa",
                input_message_content: {
                  message_text: "❌ Data admin tidak ditemukan atau sudah kadaluarsa.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { id, username, password, domainClean } = cacheData;
          const teks = `
✅ <b>Akun Admin Panel Berhasil Dibuat!</b>

⌯ User ID: <code>${id}</code>
⌯ Username: <code>${username}</code>
⌯ Password: <code>${password}</code>
⌯ Panel: <span class="tg-spoiler">https://${domainClean}</span>
`;
          return ctx.answerInlineQuery([{
            type: "article",
            id: "cadmin-result-1",
            title: "👑 Admin Created",
            description: `Admin ${username} created!`,
            input_message_content: {
              message_text: teks,
              parse_mode: "HTML",
              disable_web_page_preview: true
            },
            reply_markup: {
              inline_keyboard: [
                [{ text: "🌐 Login Panel", url: `https://${domainClean}/auth/login` }]
              ]
            }
          }], { cache_time: 0 });
        }
        
        case "nsfw": {
          if (!text) return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
          try {
            const cacheData = getCacheData(text);
            if (!cacheData) {
              return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
            }
            const { url } = cacheData
            const keyboard = [
              [
                {
                  text: "🖼️ Photo URL",
                  url: url
                }
              ]
            ];
            return ctx.answerInlineQuery([
              {
                type: "photo",
                id: `nsfw-photo-${Date.now()}`,
                title: "Random NSFW",
                photo_url: url,
                thumb_url: url,
                reply_markup: {
                  inline_keyboard: keyboard
                }
              }
            ], {
              cache_time: 0,
              is_personal: true
            });
          } catch (e) {
            console.error("NSFW inline error:", e);
            return ctx.answerInlineQuery([], { cache_time: 1 });
          }
        }
        break;

        case "deladmin": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          const res = await fetch(`${config.domain}/api/application/users`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.apikey}`
            }
          });
          const data = await res.json();
          const users = data.data || [];
          const admins = users.filter(u => u.attributes.root_admin === true);
          if (!admins.length) return ctx.answerInlineQuery([], { cache_time: 1 });
          const buttons = admins.map(a => ([{
            text: `📡 ${a.attributes.username} (ID: ${a.attributes.id})`,
            callback_data: `deladmin|${a.attributes.id}`
          }]));
          return ctx.answerInlineQuery([{
            type: "article",
            id: "deladmin-1",
            title: "⚠️ Delete Admin",
            description: "Select admin to delete",
            input_message_content: {
              message_text: `⚠️ *Hapus Admin Panel*\n\nPilih admin yang ingin dihapus:`,
              parse_mode: "Markdown"
            },
            reply_markup: { inline_keyboard: buttons }
          }], { cache_time: 0 });
        }

        case "delpanel": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          try {
            const res = await fetch(`${config.domain}/api/application/servers`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.apikey}`
              }
            });
            const data = await res.json();
            const servers = data.data || [];
            if (!servers.length)
              return ctx.answerInlineQuery([], { cache_time: 1 });
            const buttons = servers.map(s => {
              const { id, name } = s.attributes;
              return [{ text: `📡 ${name} (ID: ${id})`, callback_data: `delpanel|${id}` }];
            });
            return ctx.answerInlineQuery([{
              type: "article",
              id: "delpanel-1",
              title: "📡 Delete Server",
              description: "Select server to delete",
              input_message_content: {
                message_text: `⚠️ *Hapus User & Server Panel*\n\nPilih server yang ingin dihapus:`,
                parse_mode: "Markdown"
              },
              reply_markup: { inline_keyboard: buttons }
            }], { cache_time: 0 });
          } catch (err) {
            console.error("Error fetch servers:", err);
            return ctx.answerInlineQuery([], { cache_time: 1 });
          }
        }

        case "proses": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data proses tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { text: orderText } = cacheData;
          return ctx.answerInlineQuery([{
            type: "article",
            id: "proses-1",
            title: "📦 Processing Order",
            description: orderText,
            input_message_content: {
              message_text: `✅ Pesanan sedang diproses\n\n📦 ${orderText}\n⏰ ${tanggal(Date.now())}\n\n_Thank you for purchasing 🕊️_`,
              parse_mode: "Markdown"
            },
            reply_markup: {
              inline_keyboard: [
                [{ text: "📢 Channel Information", url: config.channelLink }]
              ]
            }
          }], { cache_time: 0 });
        }
        
        case "me": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data proses tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { teks: orderText, username } = cacheData;
          return ctx.answerInlineQuery([{
            type: "article",
            id: "proses-1",
            title: "Me Information",
            description: orderText,
            input_message_content: {
              message_text: `${orderText}`,
              parse_mode: "HTML"
            },
            reply_markup: {
              inline_keyboard: [
                [{ text: "🗨️ Profile URL", url: `https://t.me/${username}` }]
              ]
            }
          }], { cache_time: 0 });
        }

        case "installpanel-result": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan atau sudah kadaluarsa",
                input_message_content: {
                  message_text: "❌ Data install panel tidak ditemukan atau sudah kadaluarsa.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { domainpanel, username, password, ipVps, pwVps } = cacheData;
          const teks = `
✅ <b>Install Panel Berhasil!</b>

👤 Username: <code>${username}</code>
🔐 Password: <code>${password}</code>
🌐 Panel: <span class="tg-spoiler">https://${domainpanel}</span>

<b>Start Wing Command:</b>
<code>.startwings ${ipVps}|${pwVps}|token_node</code>
`;
          return ctx.answerInlineQuery([{
            type: "article",
            id: "installpanel-1",
            title: "✅ Install Panel Done",
            description: `Panel: ${domainpanel}`,
            input_message_content: {
              message_text: teks,
              parse_mode: "HTML",
              disable_web_page_preview: true
            },
            reply_markup: {
              inline_keyboard: [
                [{ text: "🌐 Login Panel", url: `https://${domainpanel}` }]
              ]
            }
          }], { cache_time: 0 });
        }
        
        case "ai-response": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) return ctx.answerInlineQuery([], { cache_time: 1 });
          return ctx.answerInlineQuery([
            {
              type: "article",
              id: "ai-1",
              title: "🤖 AI",
              description: cacheData.answer.slice(0, 80),
              input_message_content: {
                message_text: "<b>Ai message:</b>\n" + cacheData.answer, 
                parse_mode: "HTML",
              }
            }
          ], { cache_time: 0 });
        }

        case "tiktok-photo": {
          if (!text) return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
          try {
            const cacheData = getCacheData(text);
            if (!cacheData) {
              return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
            }
            const keyboard = [];
            if (cacheData.imageUrl) {
              keyboard.push([
                { text: "📥 Photo URL", url: cacheData.imageUrl }
              ]);
            }
            return ctx.answerInlineQuery([
              {
                type: "photo",
                id: `tt-photo-${Date.now()}`,
                photo_url: cacheData.imageUrl,
                thumb_url: cacheData.imageUrl,
                caption: cacheData.caption || "🖼️ TikTok Slide Photo",
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: keyboard
                }
              }
            ], {
              cache_time: 0,
              is_personal: true
            });
          } catch (e) {
            console.error("TikTok photo inline error:", e);
            return ctx.answerInlineQuery([], { cache_time: 1 });
          }
        }
        break;
        
        case "tiktok-audio": {
          if (!text) return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
          try {
            const cacheData = getCacheData(text);
            if (!cacheData) {
              return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
            }
            const keyboard = [];
            if (cacheData.audioUrl) {
              keyboard.push([{ text: "📥 Audio URL", url: cacheData.audioUrl }]);
            }
            return ctx.answerInlineQuery([
              {
                type: "audio",
                id: `tt-audio-${Date.now()}`,
                performer: "TikTok Sound",
                title: cacheData.title.substring(0, 64) || "TikTok Audio",
                audio_url: cacheData.audioUrl,
                caption: cacheData.caption || "🎵 TikTok Audio",
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: keyboard
                }
              }
            ], { 
              cache_time: 0
            });
          } catch (e) {
            console.error("TikTok audio inline error:", e);
            return ctx.answerInlineQuery([], { cache_time: 1 });
          }
        }
        break;

        case "tiktok-video": {
          if (!text) return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
          try {
            const cacheData = getCacheData(text);
            if (!cacheData) {
              return ctx.answerInlineQuery(q.id, [], { cache_time: 1 });
            }
            const keyboard = [];
            if (cacheData.videoUrl) {
              keyboard.push([{ text: "📥 Video URL", url: cacheData.videoUrl }]);
            }
            return ctx.answerInlineQuery([
              {
                type: "video",
                id: `tt-video-${Date.now()}`,
                performer: "TikTok Video",
                title: cacheData.title.substring(0, 64) || "TikTok Video",
                thumb_url: cacheData.cover || "https://img.icons8.com/color/480/tiktok--v1.png",
                video_url: cacheData.videoUrl,
                mime_type: "video/mp4",
                caption: cacheData.caption || "TikTok Video",
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: keyboard
                }
              }
            ], { 
              cache_time: 0,
              is_personal: true
            });
          } catch (e) {
            console.error("TikTok video inline error:", e);
            return ctx.answerInlineQuery([], { cache_time: 1 });
          }
        }
        break;
        
        case "play-result": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          try {
            const cacheData = getCacheData(text);
            if (!cacheData || cacheData.type !== 'play-result') {
              return ctx.answerInlineQuery([
                {
                  type: "article",
                  id: "play-error-1",
                  title: "❌ Error",
                  description: "Data tidak ditemukan",
                  input_message_content: {
                    message_text: "❌ Data lagu tidak ditemukan atau sudah kadaluarsa."
                  }
                }
              ], { cache_time: 1 });
            }
            const { youtubeUrl, audioUrl, title } = cacheData;
            if (!youtubeUrl || !audioUrl || !title) {
              return ctx.answerInlineQuery([], { cache_time: 1 });
            }
            const escapedTitle = escapeMarkdown(title);
            return ctx.answerInlineQuery([
              {
                type: "audio",
                id: `play-${Date.now()}`,
                title: escapedTitle.substring(0, 64),
                performer: "YouTube",
                audio_url: audioUrl,
                parse_mode: "MarkdownV2",
                reply_markup: {
                  inline_keyboard: [
                    [
                      { 
                        text: "🎥 YouTube Link", 
                        url: youtubeUrl 
                      }
                    ]
                  ]
                }
              }
            ], { cache_time: 0 });
          } catch (error) {
            console.error("Play-result error:", error);
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "play-error-1",
                title: "❌ Error",
                description: "Gagal memuat audio",
                input_message_content: {
                  message_text: "❌ Terjadi kesalahan saat memuat audio."
                }
              }
            ], { cache_time: 1 });
          }
        }
        
        case "subdomain": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data subdomain tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          const { text: subdomainText } = cacheData;
          if (!subdomainText.includes("|")) return ctx.answerInlineQuery([], { cache_time: 1 });
          const [host, ip] = subdomainText.split("|").map(v => v.trim());
          const domains = Object.keys(config.subdomain || {});
          if (!domains.length) return ctx.answerInlineQuery([], { cache_time: 1 });
          const buttons = domains.map(dom => ([
            { text: `🌐 ${dom}`, callback_data: `subdo|${dom}|${host}|${ip}` }
          ]));
          return ctx.answerInlineQuery([{
            type: "article",
            id: "subdo-1",
            title: "🌐 Create Subdomain",
            description: `Host: ${host} | IP: ${ip}`,
            input_message_content: {
              message_text: `
⌯ Hostname: \`${host}\`
⌯ IP: \`${ip}\`

Pilih domain server:`,
              parse_mode: "Markdown"
            },
            reply_markup: { inline_keyboard: buttons }
          }], { cache_time: 0 });
        }

        case "listpanel": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data list panel tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "listpanel-1",
            title: "📊 List Server Panel",
            description: "Daftar semua server panel",
            input_message_content: {
              message_text: cacheData.teks,
              parse_mode: "Markdown",
              disable_web_page_preview: true
            }
          }], { cache_time: 0 });
        }

        case "listadmin": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data list admin tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "listadmin-1",
            title: "📊 List Admin Panel",
            description: "Daftar semua admin panel",
            input_message_content: {
              message_text: cacheData.teks,
              parse_mode: "Markdown",
              disable_web_page_preview: true
            }
          }], { cache_time: 0 });
        }

        case "ping": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data ping tidak ditemukan.",
                  parse_mode: "HTML"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "ping-1",
            title: "📊 System Status",
            description: "Status sistem dan bot",
            input_message_content: {
              message_text: cacheData.tt,
              parse_mode: "HTML",
              disable_web_page_preview: true
            }
          }], { cache_time: 0 });
        }

        case "bl": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data blacklist tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "bl-1",
            title: "✅ Blacklist Added",
            description: `Grup ${cacheData.id} ditambahkan ke blacklist`,
            input_message_content: {
              message_text: `✅ Grup berhasil di blacklist.\nID: ${cacheData.id}`,
              parse_mode: "Markdown"
            }
          }], { cache_time: 0 });
        }

        case "delbl": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data blacklist tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "delbl-1",
            title: "✅ Blacklist Removed",
            description: `Grup ${cacheData.id} dihapus dari blacklist`,
            input_message_content: {
              message_text: `✅ Blacklist berhasil dihapus.\nID: ${cacheData.id}`,
              parse_mode: "Markdown"
            }
          }], { cache_time: 0 });
        }

        case "tourl": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data upload tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "tourl-1",
            title: "🔗 Upload Success",
            description: "Media berhasil diupload ke Catbox",
            input_message_content: {
              message_text: `✅ Media berhasil diupload\n\n🔗 ${cacheData.url}`,
              disable_web_page_preview: true
            },
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "📤 Direct Link",
                    url: cacheData.url
                  }
                ]
              ]
            }
          }], { cache_time: 0 });
        }

        case "tourl2": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data upload tidak ditemukan.",
                  parse_mode: "Markdown"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "tourl2-1",
            title: "🔗 Upload Success",
            description: "Gambar berhasil diupload ke Pixhost",
            input_message_content: {
              message_text: `✅ Upload Pixhost berhasil\n\n🖼️ ${cacheData.url}`,
              disable_web_page_preview: true
            },
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "📤 Direct Link",
                    url: cacheData.url
                  }
                ]
              ]
            }
          }], { cache_time: 0 });
        }

        case "remini": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([{
              type: "article",
              id: "remini-error",
              title: "❌ Error",
              description: "Data tidak ditemukan",
              input_message_content: {
                message_text: "❌ Data Remini tidak ditemukan."
              }
            }], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "photo",
            id: "remini-1",
            photo_url: cacheData.after,
            thumb_url: cacheData.after,
            caption: `✅ *Remini / HD Success*`,
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "📸 Photo URL",
                    url: cacheData.after
                  }
                ]
              ]
            }
          }], { cache_time: 0 });
        }

        case "jadianime": {
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([{
              type: "article",
              id: "jadianime-error",
              title: "❌ Error",
              description: "Data tidak ditemukan",
              input_message_content: {
                message_text: "❌ Data jadianime tidak ditemukan."
              }
            }], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "photo",
            id: "remini-1",
            photo_url: cacheData.after,
            thumb_url: cacheData.after,
            caption: `✅ *Conver To Anime Style Success*`,
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "📸 Photo URL",
                    url: cacheData.after
                  }
                ]
              ]
            }
          }], { cache_time: 0 });
        }
        
        
        case "eval": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data eval tidak ditemukan.",
                  parse_mode: "HTML"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "eval-1",
            title: "✅ Eval Result",
            description: "Hasil evaluasi kode",
            input_message_content: {
              message_text: `<b>✅ Eval berhasil:</b>\n<pre>${cacheData.result}</pre>`,
              parse_mode: "HTML",
              disable_web_page_preview: true
            }
          }], { cache_time: 0 });
        }

        case "eval-error": {
          if (!isOwner(ctx)) return ctx.answerInlineQuery([], { cache_time: 1 });
          if (!text) return ctx.answerInlineQuery([], { cache_time: 1 });
          const cacheData = getCacheData(text);
          if (!cacheData) {
            return ctx.answerInlineQuery([
              {
                type: "article",
                id: "error-1",
                title: "❌ Error",
                description: "Data tidak ditemukan",
                input_message_content: {
                  message_text: "❌ Data eval error tidak ditemukan.",
                  parse_mode: "HTML"
                }
              }
            ], { cache_time: 1 });
          }
          return ctx.answerInlineQuery([{
            type: "article",
            id: "eval-error-1",
            title: "❌ Eval Error",
            description: "Error evaluasi kode",
            input_message_content: {
              message_text: `<b>❌ Eval error:</b>\n<pre>${cacheData.error}</pre>`,
              parse_mode: "HTML",
              disable_web_page_preview: true
            }
          }], { cache_time: 0 });
        }

        default:
          return ctx.answerInlineQuery([], { cache_time: 1 });
      }
    } catch (e) {
      console.log("❌ Inline error:", e);
      return ctx.answerInlineQuery([], { cache_time: 1 });
    }
  });

  bot.on("callback_query", async (ctx) => {
    try {
      const data = ctx.callbackQuery.data || "";
      if (data.startsWith("menu:")) {
        const menuType = data.split(":")[1];
        switch (menuType) {
          case "main":
            return ctx.editMessageMedia({
              type: "photo",
              media: config.menuImage || "https://telegra.ph/file/1c2a9e2b3d4e5f6a7b8c9.jpg",
              caption: getMenuText(ctx),
              parse_mode: "Markdown"
            }, {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Storemenu", callback_data: "menu:store" },
                    { text: "Panelmenu", callback_data: "menu:panel" }
                  ],
                  [
                    { text: "Ownermenu", callback_data: "menu:owner" },
                    { text: "Toolsmenu", callback_data: "menu:tools" }
                  ],
                   [
                    { text: "Downloadmenu", callback_data: "menu:download" }, 
                    { text: "Searchmenu", callback_data: "menu:search" }
                  ],                                 
                  [
                    { text: "🌟 Channel Information", url: config.channelLink }
                  ]
                ]
              }
            });
          case "store":
            return ctx.editMessageText(getStoreMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          case "search":
            return ctx.editMessageText(getSearchMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          case "panel":
            return ctx.editMessageText(getPanelMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          case "download":
            return ctx.editMessageText(getDownloadMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          case "owner":
            return ctx.editMessageText(getOwnerMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          case "tools":
            return ctx.editMessageText(getToolsMenu(), {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🔙 Back to Main Menu", callback_data: "menu:main" }]
                ]
              }
            });
          default:
            return ctx.answerCbQuery("❌ Menu tidak ditemukan");
        }
      }
      if (data.startsWith("delpanel|")) {
        if (!isOwner(ctx)) return;
        const [, serverId] = data.split("|");
        await ctx.answerCbQuery("⏳ Memproses hapus server...");
        try {
          const [serverRes, userRes] = await Promise.all([
            fetch(`${config.domain}/api/application/servers/${serverId}`, {
              method: "GET",
              headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` }
            }),
            fetch(`${config.domain}/api/application/users`, {
              method: "GET",
              headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` }
            })
          ]);
          const server = (await serverRes.json()).attributes;
          const users = (await userRes.json()).data || [];
          if (!server) {
            return ctx.editMessageText(`❌ Server ID ${serverId} tidak ditemukan`, { parse_mode: "Markdown" });
          }
          const delServer = await fetch(`${config.domain}/api/application/servers/${serverId}`, {
            method: "DELETE",
            headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` }
          });
          if (!delServer.ok) {
            throw new Error("Gagal hapus server");
          }
          const serverNameLower = server.name.toLowerCase();
          const user = users.find(u => u.attributes.first_name && u.attributes.first_name.toLowerCase() === serverNameLower);
          if (user) {
            await fetch(`${config.domain}/api/application/users/${user.attributes.id}`, {
              method: "DELETE",
              headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` }
            });
          }
          return ctx.editMessageText(
            `✅ Server *${server.name}* (ID: ${serverId}) berhasil dihapus beserta user terkait!`,
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[
                  { text: "🔙 Back To List Server", callback_data: "delpanel-back" }
                ]]
              }
            }
          );
        } catch (err) {
          console.error("❌ Hapus server error:", err);
          return ctx.editMessageText(
            `❌ Gagal hapus server ID ${serverId}!\n${err.message}`,
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[
                  { text: "🔄 Back To List Server", callback_data: `delpanel-back` }
                ]]
              }
            }
          );
        }
      }
      if (data === "delpanel-back") {
        if (!isOwner(ctx)) return;
        await ctx.answerCbQuery("🔄 Menampilkan daftar server...");
        const serverRes = await fetch(`${config.domain}/api/application/servers`, {
          method: "GET",
          headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` }
        });
        const servers = (await serverRes.json()).data || [];
        if (!servers.length)
          return ctx.editMessageText("⚠️ Tidak ada server tersedia.", { parse_mode: "Markdown" });
        const buttons = servers.map(s => ([{
          text: `📡 ${s.attributes.name} (ID: ${s.attributes.id})`,
          callback_data: `delpanel|${s.attributes.id}`
        }]));
        return ctx.editMessageText(
          `⚠️ *Hapus User & Server Panel*\n\nPilih server yang ingin dihapus:`,
          {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: buttons }
          }
        );
      }
      if (data.startsWith("subdo|")) {
        if (!isOwner(ctx)) return;
        const [sub, domain, host, ip] = data.split("|");
        const api = config.subdomain[domain];
        if (!api) return ctx.answerCbQuery("❌ Domain tidak valid!");
        await ctx.answerCbQuery("⏳ Memproses...");
        const cleanHost = host.replace(/[^a-z0-9.-]/gi, "").toLowerCase();
        const cleanIp = ip.replace(/[^0-9.]/g, "");
        const rand = Math.floor(100 + Math.random() * 900);
        const panel = `${cleanHost}.${domain}`;
        const node = `node${rand}.${cleanHost}.${domain}`;
        async function createSub(name) {
          const res = await axios.post(
            `https://api.cloudflare.com/client/v4/zones/${api.zone}/dns_records`,
            {
              type: "A",
              name,
              content: cleanIp,
              ttl: 3600,
              proxied: false
            },
            {
              headers: {
                Authorization: `Bearer ${api.apitoken}`,
                "Content-Type": "application/json"
              }
            }
          );
          if (!res.data.success) {
            throw new Error(res.data.errors?.[0]?.message || "Gagal membuat subdomain");
          }
        }
        try {
          await createSub(panel);
          await createSub(node);
          return ctx.editMessageText(
            `✅ *Subdomain berhasil dibuat!*\n\n⌯ Panel:\n\`${panel}\`\n⌯ Node:\n\`${node}\`\n⌯ IP:\n\`${cleanIp}\``,
            { parse_mode: "Markdown" }
          );
        } catch (e) {
          return ctx.editMessageText(
            `❌ *Gagal membuat subdomain!*\n${e.message}`,
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[
                  { text: "🔄 Buat Ulang Subdomain", callback_data: `retry|${host}|${ip}` }
                ]]
              }
            }
          );
        }
      }
      if (data.startsWith("retry|")) {
        if (!isOwner(ctx)) return;
        const [, host, ip] = data.split("|");
        await ctx.answerCbQuery("🔄 Pilih domain lagi...");
        const buttons = Object.keys(config.subdomain).map(dom => ([
          { text: `🌐 ${dom}`, callback_data: `subdo|${dom}|${host}|${ip}` }
        ]));
        return ctx.editMessageText(
          `⌯ Hostname: \`${host}\`\n⌯ IP: \`${ip}\`\n\nPilih domain server:`,
          {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: buttons }
          }
        );
      }
      if (data.startsWith("deladmin|")) {
        if (!isOwner(ctx)) return;
        const [, userId] = data.split("|");
        await ctx.answerCbQuery("⏳ Memproses hapus admin...");
        try {
          const res = await fetch(`${config.domain}/api/application/users`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.apikey}`
            }
          });
          const users = (await res.json()).data || [];
          const targetAdmin = users.find(u => u.attributes.id == userId && u.attributes.root_admin === true);
          if (!targetAdmin) throw new Error("Admin tidak ditemukan!");
          const delRes = await fetch(`${config.domain}/api/application/users/${userId}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.apikey}`
            }
          });
          if (!delRes.ok) {
            const errData = await delRes.json();
            throw new Error(errData.errors?.[0]?.detail || "Gagal menghapus admin");
          }
          return ctx.editMessageText(
            `✅ Admin *${targetAdmin.attributes.username}* berhasil dihapus!`,
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[
                  { text: "🔙 Back To List Admin", callback_data: "deladmin-back" }
                ]]
              }
            }
          );
        } catch (err) {
          console.error("❌ Hapus admin error:", err);
          return ctx.editMessageText(
            `❌ Gagal hapus admin!\n${err.message}`,
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[
                  { text: "🔄 Back To List Admin", callback_data: "deladmin-back" }
                ]]
              }
            }
          );
        }
      }
      if (data === "deladmin-back") {
        if (!isOwner(ctx)) return;
        await ctx.answerCbQuery("🔄 Menampilkan daftar admin...");
        const res = await fetch(`${config.domain}/api/application/users`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apikey}`
          }
        });
        const users = (await res.json()).data || [];
        const admins = users.filter(u => u.attributes.root_admin === true);
        if (!admins.length) return ctx.editMessageText("⚠️ Tidak ada admin tersedia.", { parse_mode: "Markdown" });
        const buttons = admins.map(a => ([{
          text: `🗑️ ${a.attributes.username} (ID: ${a.attributes.id})`,
          callback_data: `deladmin|${a.attributes.id}`
        }]));
        return ctx.editMessageText(
          `⚠️ *Hapus Admin Panel*\n\nPilih admin yang ingin dihapus:`,
          {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: buttons }
          }
        );
      }
    } catch (err) {
      console.log("❌ Callback error:", err);
      try {
        await ctx.editMessageText("❌ Terjadi kesalahan.");
      } catch {}
    }
  });
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});