const {Model, DataTypes} = require("sequelize")

const sequelize = require("../config/db")

class Package extends Model {

}

Package.init(
    {
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "package",
    }
  );

  module.exports = Package