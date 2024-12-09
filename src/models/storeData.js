// In models/storeData.js or wherever you define these functions
let officeData = [];

const setOfficeData = (data) => {
    officeData = data;
};

const getOfficeData = () => {
    return officeData;
};

module.exports = {
    setOfficeData,
    getOfficeData,
};
