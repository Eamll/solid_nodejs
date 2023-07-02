const EncryptService = require("./EncryptService");

class BasicEncryptService extends EncryptService {
    encrypt(value) {
        // console.log("Using BasicEncryptService with ToLower encryption");
        return value.toLowerCase();
    }
}

module.exports = BasicEncryptService;
