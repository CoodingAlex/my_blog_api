const controller = require('./controller');
const mysql = require('../../../store/mysql')

module.exports = controller(mysql)
