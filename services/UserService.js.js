const User = require("../model/User");

class UserService {
    constructor() {
        this.users = [];
    }

    registerUser(name, username, password) {
        const user = new User(name, username, password);
        this.users.push(user); // Add the user to the in-memory storage
        return user;
    }

    getUserByUsername(username) {
        return this.users.find((u) => u.getUsername() === username);
    }
}

module.exports = UserService;
