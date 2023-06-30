const express = require('express');
const User = require('./model/User');
const UserController = require('./controllers/userController');
const app = express()
const port = 3000
app.use(express.json());



// In-memory storage for registered users
const users = [];

// Create an instance of the userModel and userController
// const userModel = new User();
const userController = new UserController(users);

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { nombre, usuario, password } = req.query;
    const user = userController.registerUser(nombre, usuario, password);
    console.log(usuario + "  " + password)
    res.send({ usuario, password, message: 'Registration successful' });
});

// Endpoint for login
app.post('/login', (req, res) => {
    const { usuario, password } = req.query;
    const loggedInUser = userController.loginUser(usuario, password);

    if (loggedInUser) {
        res.send({ usuario: loggedInUser.getUsername(), password: loggedInUser.getPassword(), message: 'Login successful' });
    } else {
        res.status(401).send('Invalid credentials');
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))