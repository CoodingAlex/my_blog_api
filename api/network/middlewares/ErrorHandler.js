const responses = require('../responses')
function errorLog(error) {
  console.error(error);
}

function errorHandler(error, req, res, next) {
  errorLog(error)
  responses.Error(req, res, 400, error)
}

module.exports = errorHandler