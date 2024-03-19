const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const todoRouter = require('./todoRouter');

router.use('/api/todos', todoRouter);

module.exports = router;
