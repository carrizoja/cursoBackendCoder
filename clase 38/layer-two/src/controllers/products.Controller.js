const { getData, createData } = require('../services/product.Services');

const getDataControllers = async(req, res) => {
    // Logic of required data
    let data = await getData();
    res.json(data);
}

const postDataControllers = async(req, res) => {
    // Logic of required data
    let data = req.body;
    await createData(data);
    res.json(data);
}

module.exports = {
    getDataControllers,
    postDataControllers
}