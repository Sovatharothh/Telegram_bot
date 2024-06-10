const moment = require('moment');

// Function to analyze data
const analyzeData = (data) => {
    // Step 1: Filter out rows that do not have DATE, TIME, and NAME
    const filteredData = data.filter(row => row.DATE && row.TIME && row.NAME);

    // Step 2: Convert DATE and TIME into a DateTime field
    filteredData.forEach(row => {
        row.DateTime = moment(`${row.DATE} ${row.TIME}`, 'YYYY-MM-DD HH:mm:ss').toDate();
    });

    // Step 3: Remove duplicates based on all fields
    const uniqueData = Array.from(new Set(filteredData.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));

    // Step 4: Filter valid data based on hour range (6 AM to 8 PM)
    const validData = uniqueData.filter(row => {
        const hour = moment(row.DateTime).hour();
        return hour >= 6 && hour <= 20;
    });

    // Step 5: Convert NAME to uppercase for each row in validData
    validData.forEach(row => {
        row.Name = row.NAME.toUpperCase();
    });

    // Step 6: Initialize objects to store first and last scan times for each date and name
    const firstScans = {};
    const lastScans = {};

    // Step 7: Populate firstScans and lastScans objects
    validData.forEach(row => {
        const date = row.DATE;
        const name = row.Name;
        const dateTime = row.DateTime;

        // Initialize nested objects if they don't exist
        if (!firstScans[date]) firstScans[date] = {};
        if (!lastScans[date]) lastScans[date] = {};

        // Update first scan time if it's the earliest encountered
        if (!firstScans[date][name] || dateTime < firstScans[date][name]) {
            firstScans[date][name] = dateTime;
        }

        // Update last scan time if it's the latest encountered
        if (!lastScans[date][name] || dateTime > lastScans[date][name]) {
            lastScans[date][name] = dateTime;
        }
    });

    // Step 8: Prepare finalData array with structured data for each date and name
    const finalData = [];
    Object.keys(firstScans).forEach(date => {
        Object.keys(firstScans[date]).forEach(name => {
            finalData.push({
                DATE: date,
                Name: name,
                TimeIn: firstScans[date][name],
                TimeOut: lastScans[date][name]
            });
        });
    });

    // Step 9: Sort finalData by date and time
    finalData.sort((a, b) => {
        if (a.DATE === b.DATE) {
            return new Date(a.TimeIn) - new Date(b.TimeIn);
        }
        return new Date(a.DATE) - new Date(b.DATE);
    });

    // Step 10: Return the sorted finalData array
    return finalData;
};

module.exports = { analyzeData };
