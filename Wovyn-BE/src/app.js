const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(routes);

module.exports = app;
