const { getUserServices, getUserByIdServices, createUserServices } = require('../services/user.services')

const getAllUsers = async(req, res) => {
    try {
        let users = await getUserServices()
        res.json(users)
    } catch (error) {
        console.log("Error: ", error)
    }

}

//getUserById
const getUserById = async(req, res) => {
    try {
        let { id } = req.params
        let user = await getUserByIdServices(id)
        res.json(user)
    } catch (error) {
        console.log("Error: ", error)
    }
}

//createUser

const createUser = async(req, res) => {
    try {
        let userData = req.body;
        let id = Math.floor(Math.random() * 100) + 1;
        console.log(id)
        console.log(req.body)
        userData.id = id;
        let userSave = await createUserServices(userData)

        res.json({
            message: "User created successfully",
            data: userSave
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}