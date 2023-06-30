const Configuration = require("../model/Configuration");

class ConfigService {
    constructor(config) {
        this.config = config;
    }

    getEncryptType() {
        return this.config.encryptType;
    }

    setEncryptType(encryptType) {
        this.config.encryptType = encryptType;
    }
}

module.exports = ConfigService;
