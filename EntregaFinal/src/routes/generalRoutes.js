const express = require('express')
const authMw = require('../utils/middlewares/authMiddleware')
const serverMw = require('../utils/middlewares/ServerMw');
const { passport } = require('../utils/passport/passport.js');
const controller = require('../controllers/general.controller.js')

const generalRouter = express.Router()

generalRouter.get('/', authMw.isNotAuth, controller.getHomePage)
generalRouter.get('/register', authMw.isNotAuth, controller.getRegisterPage)
generalRouter.get('/login', authMw.isNotAuth, controller.getLoginPage)
generalRouter.get('/profile', authMw.isAuth, controller.getProfilePage)
generalRouter.get('/unauthorized', controller.getUnauthorizedPage)
generalRouter.get('/profNameDisabled', controller.getProfNameDisabled)
generalRouter.get('/logout', controller.getLogoutPage)
generalRouter.get('/userPassIncorrect', controller.getUserPassIncorrectPage)
generalRouter.get('/userExists', controller.getUserExistsPage)
generalRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/userPassIncorrect',
}), controller.postUserLoginPage)
generalRouter.post('/register', passport.authenticate('local-signup', {
    failureRedirect: '/userExists',
}), controller.postUserRegisterPage)
generalRouter.post('/logout', controller.deleteUserLogOutPage)

module.exports = generalRouter