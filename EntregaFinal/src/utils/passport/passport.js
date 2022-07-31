const passport = require('passport');
const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { transporter, mailOptions } = require('../../services/Nodemailer');
const { errorLog: errorLogger, infoLog: infoLogger, warnLog: warnLog } = require('../loggers/winston');

// Passport serialization
passport.serializeUser((user, done) => {
    return done(null, user.id);
});
// Passport deserialization
passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    })
    // create Hash
const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    // Passport Strategy for sign up
passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    async(req, username, password, done) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!req.body.file) return done(null, false, { messages: "Couldn't upload avatar" })

            if (err) {
                return done(err);

            }
            if (user) {
                return done(null, false, { message: 'User already exists' });
            }
            let isAdmin = false;
            if (req.body.checkbox !== 'true') {
                isAdmin = true;
            }
            const newUser = {
                email: req.body.email,
                username: username,
                password: createHash(password),
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                age: req.body.age,
                avatar: req.body.file,
                admin: isAdmin
            }

            User.create(newUser, (err, userCreated) => {
                if (err) return done(err);
                return done(null, userCreated);
            });
            //Open session with user found
            req.session.isAuth = true;
            req.session.username = username;


        })
        try {
            mailOptions.html = `<h1>New user info</h1>
            <p>Name: ${req.body.name}</p>
            <p>Email: ${req.body.email}</p>
            <p>Phone: ${req.body.phone}</p>
            <p>Address: ${req.body.address}</p>
            <p>Age: ${req.body.age}</p>
            <p>Avatar: ${req.body.file}</p>       
            `
            let info = await transporter.sendMail(mailOptions);
            infoLogger.info(`Email sent: ${info.messageId} || Date: ${new Date()}`);

        } catch (error) {
            errorLogger.error(` ${error} || Date: ${new Date()}`);

        }
    }
));
// Local Strategy for login
passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, userFound) => {
            if (err) {
                return done(err);

            }
            //validate if user exists
            if (!userFound) {
                return done(null, false, { message: 'User not found' });
            }
            //validate if password is correct
            if (!bcrypt.compareSync(password, userFound.password)) {
                return done(null, false, { message: 'Wrong password' });
            }
            //Open session with user found
            req.session.isAuth = true;
            req.session.username = username;
            return done(null, userFound);
        })
    }
));

module.exports = { passport };