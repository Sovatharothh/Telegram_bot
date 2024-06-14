require('dotenv').config();

module.exports = {
    botToken: process.env.BOT_TOKEN,
    authorizedChatIds: JSON.parse(process.env.AUTHORIZED_CHAT_IDS),
    adminChatId: process.env.ADMIN_CHAT_ID
};
