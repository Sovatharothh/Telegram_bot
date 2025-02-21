const functions = require("firebase-functions");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("7495276063:AAEs2l5gSeIJGsyYIDcNtOwxOnblbu1Y2qo"); // Replace with your token

bot.start((ctx) => ctx.reply("Hello! I am your Firebase-hosted bot."));
bot.help((ctx) => ctx.reply("Use /start to get started."));

exports.bot = functions
    .region("us-central1") // Free-tier region
    .runWith({ memory: "128MB", timeoutSeconds: 30 }) // Free-tier limits
    .https.onRequest(async (req, res) => {
        bot.handleUpdate(req.body, res);
    });
