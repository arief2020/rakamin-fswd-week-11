const express = require('express');
const TodoController = require('../controlllers/todoController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getTodoById);
router.post('/', TodoController.store);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.destroy);

module.exports = router;
