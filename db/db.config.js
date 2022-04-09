const { database } = require('pg/lib/defaults');
const Sequelize = require('sequelize');
//const sequelize = new Sequelize(database,username,password, {
const sequelize = new Sequelize("database","admin","admin", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
 
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Cadastro = require('../db/db.model.js')(sequelize, Sequelize);
 
module.exports = db;