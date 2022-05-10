const express = require('express');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ]
})

/* log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile: { type: 'file', filename: 'info.log' }

    },
    categories: {
        default: {
            appenders: ["miLoggerConsole"],
            level: "debug"
        },
        consola: {
            appenders: ["miLoggerFile"],
            level: "warn"
        },
        archivo: {
            appenders: ["miLoggerFile"],
            level: "error"
        }
    }
}) */



/* const loggerConsole = log4js.getLogger("consola");
const loggerFile = log4js.getLogger("file"); */

// levels

logger.info("server started");
logger.debug("debug message");
logger.error("error message");
logger.warn("warning message");


app.get("/sum", (req, res) => {
    const { num1, num2 } = req.query;
    if (typeof(num1) !== "undefined" && typeof(num2) !== "undefined") {
        res.send(`${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`);
        logger.info(`${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`);
    } else {
        logger.error("user did not send the required parameters");
        res.send("numbers not defined");
    }
})

/* loggerConsole.trace("Entering cheese testing");
loggerConsole.debug("Got cheese.");
loggerConsole.info("Cheese is Good.");
loggerConsole.warn("Cheese is Almost Depleted.");
loggerConsole.error("Cheese is Depleted.");
loggerConsole.fatal("Cheese is Completely Depleted.");  */

/* loggerFile.trace("Entering cheese testing");
loggerFile.debug("Got cheese.");
loggerFile.info("Cheese is Good.");
loggerFile.warn("Cheese is Almost Depleted.");
loggerFile.error("Cheese is Depleted.");
loggerFile.fatal("Cheese is Completely Depleted."); */



app.get("/", (req, res) => {
    res.send("pagina inicial");
})



app.listen(8080, () => {
    console.log('Server running on port 8080');
})