
const { handleDocumentUpload, getTotalPeopleToday, getListOfPeopleToday, getTimesToday } = require('../controllers/botControllers');
const moment = require('moment');
const fetch = require('node-fetch');
const {Telegraf} = require('telegraf');
const config = require('../config'); 
const { BOT_TOKEN } = config;
const bot = new Telegraf(BOT_TOKEN);
const fs = require('fs');
const csvParser = require('csv-parser');

let officeData = [];

bot.start((ctx) => ctx.reply('Welcome 🥺🫶🏻'));

bot.help((ctx) => ctx.reply('Available commands:\n/document - Upload a CSV file\n/total - Total number of people in office\n/list - List of people in office\n/times - Time in and time out\n/stop - Stop the bot'));

bot.on('document', async (ctx) => {
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
    try {
        const totalPeople = getTotalPeopleToday(officeData);
        ctx.reply(`📊: Total num of ppl who came to the office today: ${totalPeople}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('list', async (ctx) => {
    try {
        const peopleList = getListOfPeopleToday(officeData);
        ctx.reply(`👩🏻‍💻👨🏻‍💻: People who came to the office today:\n${peopleList.join('\n')}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('times', async (ctx) => {
    try {
        const times = getTimesToday(officeData);
        ctx.reply(`⏰: Time in and time out today:\n${times.join('\n')}`);
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while fetching data.');
    }
});

bot.command('stop', (ctx) => {
    ctx.reply('Thanks for using our ChatBot TT');
});

module.exports = bot;
