const {Op} = require('sequelize');
const TodoRepository = require('../repositories/todoRepository');

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

/**
 * Service class for handling todoController.
 */
class TodoService {
  /**
   * Retrieves all todo with optional pagination and name filtering.
   * @param {Object} params - Parameters object.
   * @param {string} [params.name] - Name filter for todo.
   * @param {number} [params.limit] - Maximum number of todo per page.
   * @param {number} [params.page] - Page number for pagination.
   * @return {Object} Object containing todo data and pagination information.
   * @throws {Error} Throws an error if an error occurs while fetching todo.
   */
  static async getAll(params) {
    try {
      let {name, limit, page} = params;

      const filterOptions = {
        where: {},
        order: [['id', 'ASC']],
      };

      let nameFilter = {};

      if (name) {
        nameFilter = {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        };
      }

      filterOptions.where = {
        ...nameFilter,
      };

      limit = +limit || DEFAULT_LIMIT;
      page = +page || DEFAULT_PAGE;
      const offset = (page - 1) * limit;

      filterOptions.limit = limit;
      filterOptions.offset = offset;

      const {count, rows} = await TodoRepository.getAllAndCount(filterOptions);

      const totalPages = Math.ceil(count / limit);
      const nextPage = page + 1 <= totalPages ? page + 1 : null;
      const prevPage = page - 1 > 0 ? page - 1 : null;
      const currentPage = page;
      return {
        message: 'Success get all data',
        totalData: count,
        data: rows,
        currentPage,
        nextPage,
        prevPage,
        totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {Object} params - Parameters object
   * @param {number} params.id - The id of the todo to retrieve
   * @return {Object} Object containing the retrieved todo
   * @throws {Error} Throws an error if the todo not found.
   */
  static async getTodoById(params) {
    try {
      const {id} = params;
      const todo = await TodoRepository.getTodoById(id);
      if (!todo) {
        const errorMessage = {name: 'ErrorNotFound', message: 'Todo not found'};
        throw errorMessage;
      }
      return {message: 'Success todo by id', data: todo};
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {Object} params - Parameters object
   * @param {string} param.name - The name of the todo
   * @return {Object} Object containing the created todo
   * @throws { Error} Throws an error if a required field is missing
   */
  static async store(params) {
    try {
      const {name} = params;
      if (!name) {
        const errorRequiredField = {
          name: 'BadRequest',
          message: 'required field name',
        };
        throw errorRequiredField;
      }
      const todo = await TodoRepository.store({name});
      return {message: 'Success create todo', data: todo};
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   *
   * @param {Object} params - Parameters object
   * @param {string} params.name - the name of the todo
   * @return {Object} Object containing the created todo
   * @throws {Error} Throws an error if a required field is missing
   */
  static async update(params) {
    try {
      const {id, body} = params;
      const {name} = body;

      const todo = await TodoRepository.update(id, {name});
      if (todo[0] === 0) {
        const errorMessage = {name: 'ErrorNotFound', message: 'Todo Not Found'};
        throw errorMessage;
      }
      if (!name) {
        const errorRequiredField = {
          name: 'BadRequest',
          message: 'required field name',
        };
        throw errorRequiredField;
      }
      return {message: 'Success update todo'};
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {Object} params - parameters object with value req.params
   * @param {number} params.id - the id of todo will be delete
   * @return {Object} Object for respond success deleted todo
   */
  static async destroy(params) {
    try {
      const {id} = params;
      const todo = await TodoRepository.destroy(id);
      if (!todo) {
        const errorMessage = {name: 'ErrorNotFound', message: 'Todo Not Found'};
        throw errorMessage;
      }
      return {message: 'Success delete todo'};
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TodoService;
