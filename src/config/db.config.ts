import { Sequelize } from 'sequelize'

const db = new Sequelize('fastdelivery', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

export default db
