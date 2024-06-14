const bot = require('./src/routes/botRoutes');

bot.launch().then(() => {
    console.log('Bot launched successfully');
}).catch((err) => {
    console.error('Bot launch error:', err);
});
