const Sequelize = require("sequelize");

const db = new Sequelize("fast-delivery", null, null, {
    host: "localhost",
    dialect: "postgres",
    logging: false,
})

module.exports = db;