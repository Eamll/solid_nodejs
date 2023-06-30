const User = require("../model/User");

class UserController {
    constructor(users) {
        this.users = users;
    }

    registerUser(name, username, password) {
        return this.userService.registerUser(name, username, password);
    }

    loginUser(username, password) {
        // Perform login logic here
        // Use the users data to retrieve user data, validate credentials, etc.
        const user = this.userService.getUserByUsername(username);

        if (user && user.getPassword() === password) {
            return user;
        }

        return null;
    }
}

module.exports = UserController;
