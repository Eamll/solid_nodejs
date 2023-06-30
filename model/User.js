class User {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
}

module.exports = User;