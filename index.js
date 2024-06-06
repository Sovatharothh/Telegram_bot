const { Telegraf } = require('telegraf');
const BOT_TOKEN = '7407004702:AAETt_lgQh4zSYMhZ_-4re_3c9OlZBx-kvs';
const bot = new Telegraf(BOT_TOKEN);

// start the bot
bot.start((ctx) => {
    ctx.reply('Welcome to Roth first telegram bot!');
});

// help command
bot.help((ctx) => {
    ctx.reply('Let me know how is ur day TT?');
});

// stop command
bot.command('stop', (ctx) => {
    ctx.reply('Thanks for using our ChatBot TT');
});

// Launch the bot
bot.launch();
