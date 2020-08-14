function adminAuth(req, res, next) {
  // console.log(req.user);
  //   console.log(req.session.user);
  if (req.session.user.role != "admin")
    return res.status(403).send("Only Admin can Access");
  next();
}
module.exports = adminAuth;
