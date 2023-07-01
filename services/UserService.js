const User = require("../model/User");
const BasicEncryptService = require("./BasicEncryptService");
const ReverseEncryptService = require("./ReverseEncryptService");

class UserService {
    constructor(config) {
        this.config = config;
        this.users = [];
        this.encryptService = null;
        this.initializeEncryptService();
    }

    initializeEncryptService() {
        const encryptType = this.config.getEncryptType();

        if (encryptType === 1) {
            this.encryptService = new BasicEncryptService();
        } else if (encryptType === 2) {
            this.encryptService = new ReverseEncryptService();
        } else {
            throw new Error("Invalid encrypt type in configuration");
        }
    }

    loginUser(username, password) {
        const user = this.getUserByUsername(username);

        if (user) {
            const encryptedPassword = this.encryptService.encrypt(password);
            if (user.getPassword() === encryptedPassword) {
                return user;
            }
        }

        return null;
    }

    registerUser(name, username, password) {
        // Validate inputs
        this.validateRegisterInputs(name, username, password);

        // Check if user already exists
        const existingUser = this.getUserByUsername(username);
        if (existingUser) {
            throw new Error("El usuario ya existe");
        }

        const encryptedPassword = this.encryptService.encrypt(password);
        const user = new User(name, username, encryptedPassword);
        this.users.push(user);
        return user;
    }

    getUserByUsername(username) {
        return this.users.find((u) => u.getUsername() === username);
    }

    validateRegisterInputs(name, username, password) {
        if (!name || name.trim() === "") {
            throw new Error("El nombre no puede ser nulo o vacio");
        }
        if (!username || username.trim() === "") {
            throw new Error("El usuario no puede ser nulo o vacio");
        }
        if (!password || password.trim() === "") {
            throw new Error("El password no puede ser nulo o vacio");
        }
    }
}

module.exports = UserService;
