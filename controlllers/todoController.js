const TodoService = require('../services/todoService');
/**
 * Controller for handling todoRouter
 */
class TodoController {
  /**
   * Retrieves all todo.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing todo.
   */
  static async getAll(req, res, next) {
    try {
      const todo = await TodoService.getAll(req.query);
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a todo by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the todo.
   */
  static async getTodoById(req, res, next) {
    try {
      const todo = await TodoService.getTodoById(req.params);
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Stores a new todo.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the created todo.
   */
  static async store(req, res, next) {
    try {
      const todo = await TodoService.store(req.body);
      return res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }
  /**
   * Updates a todo.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response indicating success.
   */
  static async update(req, res, next) {
    try {
      const params = {
        id: req.params.id,
        body: req.body,
      };
      const todo = await TodoService.update(params);
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a todo.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the deleted todo.
   */
  static async destroy(req, res, next) {
    try {
      const todo = await TodoService.destroy(req.params);
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
