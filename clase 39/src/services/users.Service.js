const { User } = require('../models/userData');

const getData = async() => {
    let users = await User.findAll();
    return users;

}

const createData = async(data) => {
    let { username, password } = data;
    let user = await User.findOne({
        where: {
            username: username
        }
    })
    if (user) {
        return {
            message: "User already exists"
        }
    } else {
        let newUser = await User.create({
            username: username,
            password: password
        })
        return newUser
    }


};

module.exports = {
    getData,
    createData
}