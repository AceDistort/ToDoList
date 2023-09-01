const express = require('express');
const socketIo = require('socket.io');

const app = express();

// récupération des données du body
app.use(express.json());


module.exports = app;