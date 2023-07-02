class ConfigService {
    constructor(config) {
        this.config = config;
    }

    getEncryptType() {
        return this.config.getEncryptType();
    }

    setEncryptType(encryptType) {
        this.config.setEncryptType(encryptType);
    }

    getLogType() {
        return this.config.getLogType();
    }

    setLogType(logType) {
        this.config.setLogType(logType);
    }
}

module.exports = ConfigService;
