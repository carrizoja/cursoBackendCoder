const path = require('path');
const { errorLog: errorLogger, infoLog: infoLogger, warnLog: warnLog } = require('../utils/loggers/winston');
const publicPath = path.join(__dirname, '../public');

const getHomePage = (req, res) => {
    res.sendFile(path.join(publicPath, '/index.html'));

}

const getRegisterPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/register.html'));
    infoLogger.info(`User visited the register page --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getLoginPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/login.html'));
    infoLogger.info(`User visited the login page --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getProfilePage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/profile.html'));
    infoLogger.info(`User visited the profile page --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getUnauthorizedPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/unauthorized.html'));
    infoLogger.info(`User went to unauthorized page --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getProfNameDisabled = (req, res) => {
    if (req.user) res.send(req.user);
    infoLogger.info(`Fetch to obtain user data --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getLogoutPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/logout.html'));
    infoLogger.info(`User logged out --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getUserPassIncorrectPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userPassIncorrect.html'));
    infoLogger.info(`User entered wrong password --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const getUserExistsPage = (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userExists.html'));
    infoLogger.info(`User already exists --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const postUserLoginPage = (req, res) => {
    res.redirect('/profile');
    console.log(req.body);
    infoLogger.info(`User logged in with mail: ${req.body.username} --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const postUserRegisterPage = (req, res) => {
    res.redirect('/profile');
    infoLogger.info(`User registered --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
}

const deleteUserLogOutPage = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        } else {
            res.redirect('/logout');
            infoLogger.info(`User logged out --> path: ${req.path} || method: ${req.method} || Date: ${new Date()}`);
        }

    });
}


module.exports = {
    getHomePage,
    getRegisterPage,
    getLoginPage,
    getProfilePage,
    getUnauthorizedPage,
    getProfNameDisabled,
    getLogoutPage,
    getUserPassIncorrectPage,
    getUserExistsPage,
    postUserLoginPage,
    postUserRegisterPage,
    deleteUserLogOutPage

}