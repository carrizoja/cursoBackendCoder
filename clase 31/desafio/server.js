const express = require('express');
const log4js = require('log4js');

const app = express();

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile1: { type: 'file', filename: 'debug.log' },
        miLoggerFile2: { type: 'file', filename: 'errors.log' }

    },
    categories: {
        default: {
            appenders: ["miLoggerConsole"],
            level: "debug"
        },
        loggerDebug: {
            appenders: ["miLoggerFile1"],
            level: "debug"
        },
        loggerError: {
            appenders: ["miLoggerFile2"],
            level: "error"
        }
    }
})

const loggerConsole = log4js.getLogger("consola");
const loggerFile = log4js.getLogger("file");

/* loggerConsole.trace("Entering cheese testing");
loggerConsole.debug("Got cheese.");
loggerConsole.info("Cheese is Good.");
loggerConsole.warn("Cheese is Almost Depleted.");
loggerConsole.error("Cheese is Depleted.");
loggerConsole.fatal("Cheese is Completely Depleted."); */

loggerFile.trace("Entering cheese testing");
loggerFile.debug("Got cheese.");
loggerFile.info("Cheese is Good.");
loggerFile.warn("Cheese is Almost Depleted.");
loggerFile.error("Cheese is Depleted.");
loggerFile.fatal("Cheese is Completely Depleted.");



app.get("/", (req, res) => {
    res.send("home page");
})


app.get("/sum", (req, res) => {
    const { num1, num2 } = req.query;
    if (typeof(num1) !== "undefined" && typeof(num2) !== "undefined") {
        res.send(`${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`);
        console.log(`${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`);
    } else {
        console.log("user did not send the required parameters");
        res.send("numbers not defined");
    }
})



app.listen(8080, () => {
    console.log('Server running on port 8080');
})