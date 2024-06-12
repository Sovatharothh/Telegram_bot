const { analyzeData } = require('../services/botService');
const moment = require('moment');
const csvParser = require('csv-parser');
const { Readable } = require('stream');
const { setOfficeData, getOfficeData } = require('../models/storeData'); 

const handleDocumentUpload = async (ctx, buffer) => {
    try {
        const dataArray = [];
        const readable = new Readable();
        readable._read = () => {}; 
        readable.push(buffer);
        readable.push(null);

        readable.pipe(csvParser())
            .on('data', (row) => {
                dataArray.push(row);
            })
            .on('end', () => {
                console.log('CSV Data Parsed:', dataArray); 
                const analyzedData = analyzeData(dataArray);
                setOfficeData(analyzedData); 
                console.log('Analyzed Data:', getOfficeData()); 
            })
            .on('error', (error) => {
                console.error('Error parsing CSV:', error);
                throw new Error('Error in processing document.');
            });

    } catch (error) {
        console.error(error);
        throw new Error('Error in processing document.');
    }
};

const getTotalPeopleToday = () => {
    const today = moment('D/M/YYYY').format('YYYY-MM-DD');
    const officeData = getOfficeData();
    console.log('Office Data:', officeData); 
    return officeData.filter(row => row.date === today).length;
};

const getListOfPeopleToday = () => {
    const today = moment('D/M/YYYY').format('YYYY-MM-DD');
    const officeData = getOfficeData();
    const peopleList = officeData.filter(row => row.date === today).map(row => row.name);
    return [...new Set(peopleList)];
};

const getTimesToday = () => {
    const today = moment('D/M/YYYY').format('YYYY-MM-DD');
    const officeData = getOfficeData();
    return officeData.filter(row => row.date === today)
                     .map(row => `Name: ${row.name}, Time In: ${row.timeIn}, Time Out: ${row.timeOut}`);
};

module.exports = {
    handleDocumentUpload,
    getTotalPeopleToday,
    getListOfPeopleToday,
    getTimesToday,
};
