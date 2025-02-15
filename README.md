# Telegram Office Attendance Bot

This Telegram bot is built to generate the attendance data of each employee from door scanning. It allows users to upload a CSV file containing date, time, and employee name. It also provides various commands to analyze and display the information. 


## Technologies Used
- Node.js
- Telegraf (Telegram Bot API)
- BotFather (To create telegram acc and Token)
- moment.js (date and time manipulation)


## Features
- **Commands**:
  - `/start`: Starts the bot.
  - `/help`: list of available commands.
  - `/document`: Allows users to upload a CSV file containing office attendance data.
  - `/total`: Displays the total number of people in the office for the current day.
  - `/list`: Lists the names of people who came to the office for the current day.
  - `/times`: Shows the time in and time out for each person who came to the office for the current day.
  - `/stop`: Stops the bot.


## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sovatharothh/Telegram_bot.git
   cd telegram-chatbot

2. **Create the .env file:**

    ```bash
    BOT_TOKEN="YOUR TELEGRAM BOT TOKEN"
    AUTHORIZED_CHAT_IDS="TELEGRAM CHAT ID"
    ADMIN_CHAT_ID='TELEGRAM CHAT ID'


3. **Install the dependencies:**
    ```bash
    npm install

4. **Run the API:**
    ```bash
    npm start

## Try the Bot

To try the bot, search for **[CDDE Attendance Bot](https://t.me/cdde_attendance_bot)** on Telegram or click the link below to start interacting with it:

[Start the bot @cdde_attendance_bot](https://t.me/cdde_attendance_bot)

Once you start the bot, you can use commands like:

- `/help` - Get a list of available commands.
- `/total` - Check the total number of people in the office today.
- `/list` - See the list of people who came to the office today.
- `/times` - View the time in and time out for people today.


