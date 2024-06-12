const bot = require('./src/routes/botRoutes');

bot.launch().then(() => {
    console.log('Bot is running TT');
}).catch((err) => {
    console.error('Bot launch error:', err);
});
