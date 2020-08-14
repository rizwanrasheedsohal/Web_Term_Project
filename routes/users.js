var express = require("express");
var router = express.Router();
var { user_model } = require("../models/user");

/* GET users listing. */
router.get("/register", async function (req, res, next) {
  res.render("users/register");
});

/* Register a user and save data to DB. */
router.post("/register", async function (req, res, next) {
  let user = await user_model.findOne({ email: req.body.email });
  if (user) return res.redirect("/users/register");
  console.log("I am working");
  user = new user_model(req.body);
  console.log(user);
  await user.save();
  res.redirect("/");
});

/* Login a user and verify from DB*/
router.get("/login", async function (req, res, next) {
  res.render("users/login");
});

/* */
router.post("/login", async function (req, res, next) {
  let user = await user_model.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return res.redirect("/users/login");
  } else {
    req.session.user = user;
    console.log(req.session.user);
    return res.redirect("/products");
  }
});

/* Logout user*/
router.get("/logout", async function (req, res, next) {
  req.session.user = null;
  res.redirect("/users/login");
});

module.exports = router;
