const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(router);
app.use(errorHandler);


module.exports = app;
