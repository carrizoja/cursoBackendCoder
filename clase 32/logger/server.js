const log4js = require('log4js');


// levels    

log4js.configure({
    appenders: {
        myLoggerConsole: { type: 'console' },
        myLoggerFile: { type: 'file', filename: 'info.log' },
        myLoggerFile2: { type: 'file', filename: 'info2.log' },
    },

    categories: {
        default: { appenders: ['myLoggerConsole'], level: 'trace' },
        console: { appenders: ['myLoggerConsole'], level: 'debug' },
        file: { appenders: ['myLoggerFile'], level: 'warn' },
        file2: { appenders: ['myLoggerFile2'], level: 'info' },
        all: { appenders: ['myLoggerConsole', 'myLoggerFile'], level: 'error' },

    },
})

const logger = log4js.getLogger('all');

logger.trace('Logger trace');
logger.debug('Logger debug');
logger.info('Logger info');
logger.warn('Logger warn');
logger.error('Logger error');
logger.fatal('Logger fatal');