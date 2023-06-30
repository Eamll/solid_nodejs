class Configuration {
    constructor() {
        this.encryptType = 1; // Set the default encrypt type here
    }

    getEncryptType() {
        return this.encryptType;
    }

    setEncryptType(encryptType) {
        this.encryptType = encryptType;
    }
}

module.exports = Configuration;
