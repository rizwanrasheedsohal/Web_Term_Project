function loginAuth(req, res, next) {
  //In this middleware, i check only logged in user can add products
  if (req.session.user) next();
  else return res.redirect("/users/login");
  //   res.locals.user = req.session.user;
  //   next();
}

module.exports = loginAuth;
