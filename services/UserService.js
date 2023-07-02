const Log = require("../model/Log");
const User = require("../model/User");
const BasicEncryptService = require("./BasicEncryptService");
const ReverseEncryptService = require("./ReverseEncryptService");
const ConfigService = require("./configService");


class UserService {
    constructor(config) {
        this.config = config;
        this.users = [];
        this.encryptService = null;
        this.logService = null;
        this.initializeEncryptService();
        this.initializeLogService();
    }

    initializeEncryptService() {
        const encryptType = this.config.getEncryptType(); // Get the updated encryptType from the current config
        if (encryptType === '1') {
            this.encryptService = new BasicEncryptService();
        } else if (encryptType === '2') {
            this.encryptService = new ReverseEncryptService();
        } else {
            throw new Error("Invalid encrypt type in configuration");
        }
    }
    updateConfig(config) {

        this.config = config;
        this.initializeEncryptService();
    }

    initializeLogService() {
        const configService = new ConfigService(this.config); // Create an instance of ConfigService
        this.logService = new Log(configService); // Pass the ConfigService instance to Log constructor
    }

    loginUser(username, password) {
        const user = this.getUserByUsername(username);
        this.validateLoginInputs(username, password);
        if (user) {
            const encryptedPassword = this.encryptService.encrypt(password);
            if (user.getPassword() === encryptedPassword) {
                this.logService.log(`Successful login for user ${username}`);
                return user;
            }
        }
        this.logService.log(`Failed login attempt for user ${username}`);
        return null;
    }

    registerUser(name, username, password) {
        // Update the userService with the latest configuration
        this.updateConfig(this.config);
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
        this.logService.log(`Registered new user ${username}`);
        return user;
    }

    getUserByUsername(username) {
        return this.users.find((u) => u.getUsername() === username);
    }

    validateRegisterInputs(name, username, password) {
        let errorMessage = '';

        if (!name || name.trim() === "") {
            errorMessage = "El nombre no puede ser nulo o vacio";
        } else if (!username || username.trim() === "") {
            errorMessage = "El usuario no puede ser nulo o vacio";
        } else if (!password || password.trim() === "") {
            errorMessage = "El password no puede ser nulo o vacio";
        }

        if (errorMessage !== '') {
            this.logService.log(errorMessage);
            const error = new Error(errorMessage);
            error.stack = undefined; // Override the stack property to remove the stack trace
            throw error;
        }
    }

    validateLoginInputs(username, password) {
        let errorMessage = '';

        if (!username || username.trim() === "") {
            errorMessage = "El usuario no puede ser nulo o vacio";
        } else if (!password || password.trim() === "") {
            errorMessage = "El password no puede ser nulo o vacio";
        }

        if (errorMessage !== '') {
            this.logService.log(errorMessage);
            const error = new Error(errorMessage);
            error.stack = undefined; // Override the stack property to remove the stack trace
            throw error;
        }
    }
}

module.exports = UserService;
