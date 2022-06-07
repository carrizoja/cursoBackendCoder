const { recoverData, saveData } = require('../models/productData');

const getData = async() => {
    return await recoverData();
}

const createData = async(data) => {
    let dataId = Math.random();
    data.push = { "id": dataId };
    await saveData(data);
    return data;
}

module.exports = {
    getData,
    createData
}