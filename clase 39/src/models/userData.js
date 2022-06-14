const { db } = require('../../db');
let Sequelize = require('sequelize');
let dataTypes = Sequelize.DataTypes;

const User = db.define(
    'user', {
        username: {
            type: dataTypes.TEXT,
            require: true,
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: dataTypes.ENUM("user", "moderator"),
            defaultValue: "user",
            allowNull: false,
        },

        /*  timestamps: false, */
    }
)

module.exports = User;