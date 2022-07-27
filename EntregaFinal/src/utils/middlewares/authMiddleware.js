class Auth {


    isAuth(req, res, next) {
        const userIsAuthenticated = req.session.user ? true : false;
        if (userIsAuthenticated || req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/logout');
        }
    }

    isNotAuth(req, res, next) {
        const userIsAuthenticated = req.session.user ? true : false;
        if (!userIsAuthenticated && !req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/profile');
        }
    }

}

module.exports = new Auth();