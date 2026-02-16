
module.exports = {
  /**
   * ===== TELEGRAM API =====
   */
  apiId: 30155952, // api_id Telegram (didapat dari my.telegram.org)
  apiHash: "ce5e319de2da2d0659c381eae3c47e0d", // api_hash Telegram
  sessionFile: "./session.txt", // File penyimpanan session Telegram (login user)

  /**
   * ===== BOT TELEGRAM =====
   */
  botToken: "8414468777:AAGgr-TC011_JVqk5LUoJAItMIC6jkgmE1s", // Token Bot Telegram
  botUsername: "Sanzbotz_bot", // Username bot Telegram (tanpa @)

  /**
   * ===== TAMPILAN & UMUM =====
   */
  botName: "Sanz Assistant", 
  version: "1.0.0", 
  menuImage: "https://files.catbox.moe/1kd5kj.jpg", 
  prefix: ".", // Prefix command bot (contoh: .menu)
  
  /**
   * ===== OWNER BOT =====
   */
  ownerName: "Sanzxcode", // Nama owner
  ownerId: 8504274791, // User ID Telegram owner (hak penuh)

  /**
   * ===== LINK & SOSIAL =====
   */
  channelLink: "https://t.me/Sanzxcode_official", // Link channel WhatsApp / info bot

  /**
   * ===== PAYMENT METHOD =====
   */
  payment: {
    qris: "https://files.catbox.moe/wri0uz.jpg", // QRIS (gambar)
    dana: "08889783250", // Nomor DANA
    ovo: "Tidak tersedia", // OVO belum tersedia
    gopay: "Tidak tersedia" // GoPay belum tersedia
  },

  /**
   * ===== SUBDOMAIN (CLOUDFLARE) =====
   * Digunakan untuk create / delete DNS record (subdomain)
   */
  subdomain: {
   "sanzxcode.web.id": {
    zone: "f114e984500ad1aa6e2a92e371f61c86",
    apitoken: "qqytXu_DzYk8VoYe48Ehp9rsVVjn0g-8nD9VRw-E"
    },
    "xcodes.my.id": {
    zone: "f7862f58f30b55606d75edf42652a716",
    apitoken: "i8pMFeVDoUVhTloc-Uc11KgZVFuoNkp2qy5w_riu"
    },
    "skyzopedia.web.id": {
      zone: "0ef4ccf8a122c678c0b192fc8d7b3b", // Zone ID Cloudflare
      apitoken: "-DO2C7aUMOuKMhWKhK5PFIUus7xUfmG5FRuzPe" // API Token Cloudflare
    },

    "pterovip.my.id": {
      zone: "4b262004a90e37c8656accb7087c4150",
      apitoken: "nO2ibDMeLB6bKqjjTIvsOtp0A8E-epozNpIrN5_l"
    },

    "panelwebsite.biz.id": {
      zone: "2d6aab40136299392d66eed44a7b1122",
      apitoken: "SbRAPRzC34ccmf4cJs-0qZ939yHe3Ko6CpolxqW4"
    },

    "privatserver.my.id": {
      zone: "699bb9eb65046a886399c91daacb1968",
      apitoken: "SbRAPRzC34ccmf4cJs-0qZ939yHe3Ko6CpolxqW4"
    },

    "serverku.biz.id": {
      zone: "4e4feaba70b41ed78295d2dcc090dd3a",
      apitoken: "SbRAPRzC34ccmf4cJs-0qZ939yHe3Ko6CpolxqW4"
    },

    "vipserver.web.id": {
      zone: "e305b750127749c9b80f41a9cf4a3a53",
      apitoken: "SbRAPRzC34ccmf4cJs-0qZ939yHe3Ko6CpolxqW4"
    },

    "mypanelstore.web.id": {
      zone: "c61c442d70392500611499c5af816532",
      apitoken: "SbRAPRzC34ccmf4cJs-0qZ939yHe3Ko6CpolxqW4"
    }
  },

  /**
   * KONFIGURASI PTERODACTYL PANEL
   * ===============================
   */
  egg: "15",       // ID Egg (jenis server)
  nestid: "5",     // ID Nest
  loc: "1",        // ID Location
  domain: "https://newpanelseller.sanzxcode.web.id", // URL panel Pterodactyl
  apikey: "ptla_zMw8w4C5Lbd3vpremyE3alWjb8MXGuFNv0y92dSNv9M",   // API Key PTLA (Application API)
  capikey: "ptlc_QMZeSK9DtxuDtjcK6a392nAj3dIe7OmiCRLC3woolEH"   // API Key PTLC (Client API)
};