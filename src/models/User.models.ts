import { Model, DataTypes, SaveOptions } from 'sequelize'
import db from '../config/db'
import bcrypt from 'bcrypt'
import { UserAttributes } from '../types'

class User extends Model<UserAttributes> {
  async hash (password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  async validatePassword (password: string): Promise<boolean> {
    const salt: string = await this.get('salt') as string
    const originalPassword = await this.get('password') as string
    const hash = await this.hash(password, salt)
    return (hash === originalPassword)
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Disabled', 'Inactive', 'On Course', 'Unvalidated', 'Free'),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Driver', 'Admin'),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: 'user'
  }
)

User.beforeSave(async (user: User, options: SaveOptions<any>) => {
  const salt = bcrypt.genSaltSync(8)
  user.set('salt', salt)
  const password: string = user.get('password') as string
  const hash = await user.hash(password, salt)
  user.set('password', hash)
})

export default User
