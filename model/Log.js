const axios = require('axios');
const fs = require('fs');
const connection = require('../db/connection');


class Log {
    constructor(configService) {
        this.configService = configService;
    }

    log(message) {
        const logType = this.configService.getLogType();

        switch (logType) {
            case 'file':
                this.logToFile(message);
                break;
            case 'database':
                this.logToDatabase(message);
                break;
            case 'url':
                this.logToURL(message);
                break;
            default:
                console.log(`Logging message: ${message}`);
        }
    }

    logToFile(message) {
        const logFilePath = './logfile.txt';

        fs.appendFile(logFilePath, `${message}\n`, (err) => {
            if (err) {
                console.error('Failed to log to file:', err);
            } else {
                console.log(`Logging to file: ${message}`);
            }
        });
    }

    logToDatabase(message) {
        const sql = 'INSERT INTO registro_solid (message, timestamp) VALUES (?, ?)';
        const values = [message, new Date()];

        connection.query(sql, values, (err) => {
            if (err) {
                console.error('Failed to log to database:', err);
            } else {
                console.log(`Logging to database: ${message}`);
            }
        });
    }

    logToURL(message) {
        // Implement logic to send the log to a specific URL
        const url = 'http://logger.odontoemergencias.com/api/log';
        const logValueParam = { log_value: message };

        axios
            .post(url, logValueParam)
            .then(() => {
                console.log(`Logging to URL: ${message}`);
            })
            .catch((error) => {
                console.error('Failed to log to URL:', error);
            });
    }
}

module.exports = Log;
