const { getData, createData } = require('../services/users.Service')

const getDataController = async(req, res) => {
    let data = await getData()
    res.json(data)
}

const postDataController = async(req, res) => {
    let data = await postData(req.body)
    let response = await createData(data)
    res.json(response)
}

module.exports = {
    getDataController,
    postDataController
}