const { userDao } = require('../models/index');

// here there are methods to comunicate with DAOs

// getUserServices
const getUserServices = async() => {
    return await userDao.listAll()
}

//getUserByIdServices
const getUserByIdServices = async(id) => {
    return await userDao.getById(id)
}

//createUserServices
const createUserServices = async(userData) => {
    return await userDao.create(userData)
};

module.exports = {
    getUserServices,
    getUserByIdServices,
    createUserServices
}