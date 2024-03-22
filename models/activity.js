'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Activity extends Model {
    // eslint-disable-next-line valid-jsdoc
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    todo_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
