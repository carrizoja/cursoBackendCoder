let winston = require("winston");

const logger = {
    infoLog: winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: './logs/info.log',
            }),
        ]
    }),
    warnLog: winston.createLogger({
        level: "warn",
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: './logs/warn.log',
            }),
        ]
    }),
    errorLog: winston.createLogger({
        level: "error",
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: './logs/error.log',
            }),
        ]
    })
}

module.exports = logger;