const express = require('express');
const log4js = require('log4js');

const app = express();

log4js.configure({
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
    res.send("pagina inicial");
})



app.listen(8080, () => {
    console.log('Server running on port 8080');
})