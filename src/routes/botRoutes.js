const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const { handleDocumentUpload, getTotalPeopleToday, getListOfPeopleToday, getTimesToday } = require('../controllers/botControllers');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const authorizedChatIds = JSON.parse(process.env.AUTHORIZED_CHAT_IDS || '[]'); 

const bot = new Telegraf(botToken);

let authorizedChatIdsSet = new Set(authorizedChatIds);

bot.start((ctx) => {
    console.log('Incoming chat ID:', ctx.chat.id.toString());
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    ctx.reply('Welcome 🥺🫶🏻');
});

bot.help((ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    ctx.reply('Available commands:\n/document - Upload a CSV file\n/total - Total number of people in office\n/list - List of people in office\n/times - Time in and time out\n/stop - Stop the bot');
});

bot.on('document', async (ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    try {
        const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
        const ext = ctx.message.document.file_name.split('.').pop();

        const response = await fetch(file);
        const buffer = await response.buffer();

        if (ext === 'csv') {
            const officeData = await handleDocumentUpload(ctx, buffer);
            ctx.reply('CSV file processed and data analyzed.');
        } else {
            ctx.reply('Unsupported file type. Please upload a CSV file.');
        }
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while processing the file.');
    }
});

bot.command('total', async (ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    try {
        const totalPeople = getTotalPeopleToday();
        ctx.reply(`📊: Total number of people who came to the office today: ${totalPeople}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('list', async (ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    try {
        const peopleList = getListOfPeopleToday();
        ctx.reply(`👩🏻‍💻👨🏻‍💻: People who came to the office today:\n${peopleList.join('\n')}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('times', async (ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    try {
        const times = getTimesToday();
        ctx.reply(`⏰: Time in and time out today:\n${times.join('\n')}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('stop', (ctx) => {
    if (!authorizedChatIdsSet.has(ctx.chat.id.toString())) {
        return ctx.reply('Unauthorized access. Please contact the admin.');
    }
    ctx.reply('Thanks for using our ChatBot TT');
});

module.exports = bot;
