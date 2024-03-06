import { Model, DataTypes } from 'sequelize'
import db from '../config/db'
import { PackageAttributes } from '../types'
import User from './User.models'

class Package extends Model<PackageAttributes> {
}

Package.init(
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'On Course', 'Delivered', 'Free'),
      allowNull: false
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'package'
  }
)

export default Package
