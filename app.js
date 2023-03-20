const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const app = express();

require('dotenv/config');
require('./db');
require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const index = require('./routes/index');
app.use('/', index);

require('./error-handling')(app);

module.exports = app;
