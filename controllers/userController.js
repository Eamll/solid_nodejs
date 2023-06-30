
const UserService = require("../services/UserService");

class UserController {
    constructor(users, configService) {
        this.users = users;
        this.userService = new UserService(configService);
    }

    registerUser(name, username, password) {
        return this.userService.registerUser(name, username, password);
    }

    loginUser(username, password) {
        return this.userService.loginUser(username, password);
    }
}

module.exports = UserController;
