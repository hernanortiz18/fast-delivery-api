const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/db")
const bcrypt = require("bcrypt")
class User extends Model {
  hash(password, salt){
    return bcrypt.hash(password, salt);
  }
}

User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: sequelize,
      modelName: "user",
    }
  );

    User.beforeSave((user)=>{
      user.salt = bcrypt.genSaltSync(8);
      return user.hash(user.password, user.salt)
      .then((hash)=> (user.password = hash));
    });

  module.exports = User;
