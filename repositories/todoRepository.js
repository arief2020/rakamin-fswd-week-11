const {Todo} = require('../models');

/**
 * Repository for handling todoService
 */
class TodoRepository {
  /**
   * Retrieves all todo and their count based on provided filter options.
   * @param {Object} filter - Filter options for querying todo.
   * @return {Object} Object containing count and rows of todo.
   * @throws {Error} Throws an error if an error occurs while fetching todo.
   */
  static async getAllAndCount(filter) {
    try {
      const {count, rows} = await Todo.findAndCountAll(filter);
      return {count, rows};
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a todo by its ID.
   * @param {number} id - ID of the todo to retrieve.
   * @return {Object} Todo object if found, otherwise null.
   * @throws {Error} Throws an error if an error occurs while fetching the todo.
   */
  static async getTodoById(id) {
    try {
      return await Todo.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Stores a new todo.
   * @param {Object} data - Data for creating the new todo.
   * @return {Object} Created todo object.
   * @throws {Error} Throws an error if an error occurs while storing the todo.
   */
  static async store(data) {
    try {
      return await Todo.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a todo.
   * @param {number} id - ID of the todo to update.
   * @param {Object} data - Data to update the todo with.
   * @return {number} Number of affected rows.
   * @throws {Error} Throws an error if an error occurs while updating the todo.
   */
  static async update(id, data) {
    try {
      return await Todo.update(data, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a todo.
   * @param {number} id - ID of the todo to delete.
   * @return {number} Number of affected rows.
   * @throws {Error} Throws an error if an error occurs while deleting the todo.
   */
  static async destroy(id) {
    try {
      return await Todo.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TodoRepository;
