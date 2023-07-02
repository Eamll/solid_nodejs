const express = require('express');
const UserController = require('./controllers/userController');
const ConfigService = require('./services/configService');
const Configuration = require('./model/Configuration');
const Log = require('./model/Log');


const app = express()
const port = 3000
app.use(express.json());

// In-memory storage for registered users
const users = [];

// Create an instance of the userModel and userController

const config = new Configuration(); // Initialize the configuration object
const configService = new ConfigService(config);
const log = new Log(configService);
// Endpoint to get the current encryption type
app.get('/encryption', (req, res) => {
    const encryptType = configService.getEncryptType();
    res.send({ encryptType });
});

// Endpoint to change the configuration (encryption and log type)
app.put('/configuration', (req, res) => {
    const { encryptType, logType } = req.query;

    // Update the encryption type
    if (encryptType) {
        configService.setEncryptType(encryptType);
    }
    // Update the log type
    if (logType) {
        configService.setLogType(logType);
    }
    log.log(`Configuration changed to encryptType : ${configService.getEncryptType()}, logType: ${configService.getLogType()}`);
    res.send({ encryptType: configService.getEncryptType(), logType: configService.getLogType() });
});

const userController = new UserController(users, configService);

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { nombre, usuario, password } = req.query;
    const user = userController.registerUser(nombre, usuario, password);
    res.send({ usuario: user.getUsername(), password: user.getPassword(), config, message: 'Registration successful' });
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