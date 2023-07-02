const EncryptService = require("./EncryptService");

class ReverseEncryptService extends EncryptService {
    encrypt(value) {
        // console.log("Using ReverseEncryptService with ReverseToArray encryption");
        return value.split("").reverse().join("");
    }
}

module.exports = ReverseEncryptService;
