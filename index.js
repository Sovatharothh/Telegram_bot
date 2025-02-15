const express = require("express");
const bot = require("./src/routes/botRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Bot is running...");
});

// Launch the bot
bot.launch()
    .then(() => {
        console.log("Bot launched successfully");
    })
    .catch((err) => {
        console.error("Bot launch error:", err);
    });

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
