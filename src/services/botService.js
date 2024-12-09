const moment = require('moment');
const OfficeData = require('../models/officeData');

const analyzeData = (dataArray) => {
    const officeData = [];

    // Group scans by date and name
    const groupedData = {};
    dataArray.forEach(row => {
        const formattedDate = moment(row.DATE, ['M/D/YYYY', 'D/M/YYYY']).isValid() 
                              ? moment(row.DATE, ['M/D/YYYY', 'D/M/YYYY']).format('YYYY-MM-DD')
                              : 'Invalid date'; 
        
        const key = `${formattedDate}_${row.NAME.toUpperCase()}`;
        if (!groupedData[key]) {
            groupedData[key] = [];
        }
        groupedData[key].push(row.TIME); // Collect all scan times for each person on each day
    });

    // Process grouped data to create OfficeData objects
    Object.keys(groupedData).forEach(key => {
        const [formattedDate, name] = key.split('_');
        const times = groupedData[key];
        
        // Use the first scan time as time-in
        const timeIn = times.length > 0 ? moment(times[0], 'HH:mm:ss').format('HH:mm:ss') : 'N/A';
        
        // Determine time-out based on the number of scans
        let timeOut;
        if (times.length === 1) {
            // If only one scan, time-out is the same as time-in
            timeOut = timeIn;
        } else {
            // If multiple scans, time-out is the last scan time
            timeOut = moment(times[times.length - 1], 'HH:mm:ss').format('HH:mm:ss');
        }

        const entry = new OfficeData(formattedDate, name, timeIn, timeOut);
        officeData.push(entry);
    });

    return officeData;
};

module.exports = {
    analyzeData,
};
