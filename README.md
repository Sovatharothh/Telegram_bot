# Telegram Office Attendance Bot

This Telegram bot is built to generate the attendance data of each employee from door scanning. It allows users to upload a CSV file containing date, time, and employee name. It also provides various commands to analyze and display the information.


## Technologies Used
- Node.js
- Telegraf (Telegram Bot API)
- multer (file upload handling)
- csv-parser (CSV parsing)
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

