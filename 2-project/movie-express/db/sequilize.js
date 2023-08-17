const { Sequelize } = require('sequelize');
// Example for sqlite
const sequelize = new Sequelize('sqlite::memory:')
const models = [
    // Add here all of your models
    require('../models/user'),
].map(m => m(sequelize));
sequelize.sync().then(console.log('DB is synced'));
module.exports = sequelize;