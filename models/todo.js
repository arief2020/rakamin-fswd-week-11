const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Todo extends Model {
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
  Todo.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Todo',
      },
  );
  return Todo;
};
