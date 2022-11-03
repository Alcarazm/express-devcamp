'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isAlpha: {
          args: true,
          msg: "username solo debe tener letras"
        },
        notEmpty: {
          args: true,
          msg: "username no debe estar vacio"
        },
        notNull: {
          args: true,
          msg: "username no puede ser nulo"
        }
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User',
  });
  return User;
};