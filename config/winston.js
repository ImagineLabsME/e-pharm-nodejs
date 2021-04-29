const winston = require('winston');

const logConfiguration = {
    transports: [
        new winston.transports.File({
            level: 'warn',
            filename: 'logging/warn.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logging/error.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logging/info.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ]
};

const localConfiguration = {
    transports: [
        new winston.transports.Console()
    ]
};
const logger = winston.createLogger(process.env.ENVIRONMENT === "local" ? localConfiguration : logConfiguration);

module.exports = logger;
