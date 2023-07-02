class Configuration {
    constructor() {
        this.encryptType = '1'; // Set the default encrypt type here
        this.logType = 'file'; // Set the default log type here
    }

    getEncryptType() {
        return this.encryptType;
    }

    setEncryptType(encryptType) {
        this.encryptType = encryptType;
    }

    getLogType() {
        return this.logType;
    }

    setLogType(logType) {
        this.logType = logType;
    }
}

module.exports = Configuration;
