const ActivityService = require('../services/activityService');

/**
 * Controller for handling activityRouter
 */
class ActivityController {
  /**
   * Retrieves all activity.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing activity.
   */
  static async getAll(req, res, next) {
    try {
      const activity = await ActivityService.getAll(req.query);
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a activity by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the activity.
   */
  static async getActivityById(req, res, next) {
    try {
      const activity = await TodoService.getActivityById(req.params);
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Stores a new activity.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the created activity.
   */
  static async store(req, res, next) {
    try {
      const activity = await ActivityService.store(req.body);
      return res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  }
  /**
   * Updates a activity.
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
      const activity = await TodoService.update(params);
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a activity.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next function.
   * @return {Object} JSON response containing the deleted activity.
   */
  static async destroy(req, res, next) {
    try {
      const activity = await TodoService.destroy(req.params);
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ActivityController;
