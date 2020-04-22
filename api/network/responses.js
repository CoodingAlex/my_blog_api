function Error(req, res, status, error, message) {
  res.status(status).json({ error: error.message || "Ha habido un error" });
}

function Success(req, res, status, data, message) {
  res.status(status).json(data);
}

module.exports = {
  Error,
  Success,
};
