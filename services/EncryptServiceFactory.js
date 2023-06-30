const BasicEncryptService = require('./BasicEncryptService');
const ReverseEncryptService = require('./ReverseEncryptService');

class EncryptService {
    constructor(encryptType) {
        if (encryptType === 1) {
            this.encryptService = new BasicEncryptService();
        } else if (encryptType === 2) {
            this.encryptService = new ReverseEncryptService();
        } else {
            throw new Error('Invalid encrypt type in configuration');
        }
    }

    getEncryptService() {
        return this.encryptService;
    }
}

module.exports = EncryptService;
