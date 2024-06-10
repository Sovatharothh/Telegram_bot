const { Telegraf } = require('telegraf');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');
const moment = require('moment');
const { analyzeData } = require('../controllers/botControllers');

const BOT_TOKEN = '7495276063:AAEs2l5gSeIJGsyYIDcNtOwxOnblbu1Y2qo';
const bot = new Telegraf(BOT_TOKEN);
let officeData = []; // Store office data

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Start command: Welcome message
bot.start((ctx) => ctx.reply('Welcome 🥺🫶🏻'));

// Help command: List available commands
bot.help((ctx) => ctx.reply('Available commands:\n/document - Upload a CSV file\n/total - Total number of people in office\n/list - List of people in office\n/times - Time in and time out\n/stop - Stop the bot'));

// Document command: Handle uploaded CSV file
bot.on('document', async (ctx) => {
    try {
        const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
        const ext = ctx.message.document.file_name.split('.').pop();

        const response = await fetch(file);
        const buffer = await response.buffer();

        if (ext === 'csv') {
            let dataArray = [];
            const stream = require('stream');
            const readableStream = new stream.Readable();
            readableStream.push(buffer);
            readableStream.push(null);

            readableStream
                .pipe(csv())
                .on('data', (row) => {
                    // Adjust date parsing for MM-DD-YYYY format
                    const formattedDate = moment(row.DATE, 'MM-DD-YYYY').format('YYYY-MM-DD');
                    row.DATE = formattedDate;
                    dataArray.push(row);
                })
                .on('end', () => {
                    officeData = analyzeData(dataArray);
                    ctx.reply('CSV file processed and data analyzed.');
                });
        } else {
            ctx.reply('Unsupported file type. Please upload a CSV file.');
        }
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while processing the file.');
    }
});

// Total command: Total number of people in office today
bot.command('total', (ctx) => {
    if (officeData.length === 0) {
        ctx.reply('No data available. Please upload a CSV file using /document.');
        return;
    }

    const today = moment().format('YYYY-MM-DD');
    const totalPeople = officeData.filter(row => row.DATE === today).length;
    ctx.reply(`👨🏻‍💻👩🏻‍💻: Total number of people who came to the office today: ${totalPeople}`);
});

// List command: List of people in office today
bot.command('list', (ctx) => {
    if (officeData.length === 0) {
        ctx.reply('No data available. Please upload a CSV file using /document.');
        return;
    }

    const today = moment().format('YYYY-MM-DD');
    const peopleList = officeData.filter(row => row.DATE === today).map(row => row.Name);
    const uniquePeople = [...new Set(peopleList)];
    ctx.reply(`🔖: People who came to the office today: \n${uniquePeople.join('\n')}`);
});

// Times command: Time in and time out for people in office today
bot.command('times', (ctx) => {
    if (officeData.length === 0) {
        ctx.reply('No data available. Please upload a CSV file using /document.');
        return;
    }

    const today = moment().format('YYYY-MM-DD');
    const times = officeData.filter(row => row.DATE === today)
                            .map(row => `Name: ${row.Name}, Time In: ${moment(row.TimeIn).format('HH:mm:ss')}, Time Out: ${moment(row.TimeOut).format('HH:mm:ss')}`);
    ctx.reply(`⏰: Time in and time out: \n${times.join('\n')}`);
});

// Stop command: Stop the bot
bot.command('stop', (ctx) => {
    ctx.reply('Thanks for using our ChatBot TT');
});

module.exports = bot;
