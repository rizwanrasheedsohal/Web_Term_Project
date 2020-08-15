const { validatelogin } = require("../models/user");

function loginvalidate(req, res, next) {
  let { error } = validatelogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = loginvalidate;
