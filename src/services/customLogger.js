const winston = require('winston');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.cli({
                colors: {
                    error: 'red',
                    warn: 'yellow',
                    info: 'cyan',
                    debug: 'green'
                }
            })
        }),
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'logs/filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'logs/filelog-error.log',
            level: 'error'
        })
    ]
});

module.exports = logger;
