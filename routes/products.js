var express = require("express");
var router = express.Router();
var { product_model } = require("../models/product_model");
var mongoose = require("mongoose");
var loginAuth = require("../middleware/loginAuth");
var addProductAuth = require("../middleware/addProductAuth");
var adminAuth = require("../middleware/adminAuth");

/* List all Products. */
router.get("/", async function (req, res, next) {
  // console.log(req.session.user);
  let products = await product_model.find();
  res.render("products/list", {
    title: "Products in DB",
    products,
  });
});

/// form of Add product
router.get("/add", loginAuth, adminAuth, function (req, res, next) {
  res.render("products/add");
});

/////########## Store data in DB  ###############
router.post("/add", loginAuth, adminAuth, addProductAuth, async function (
  req,
  res,
  next
) {
  console.log(req.body);
  let product = new product_model(req.body);
  console.log(product);
  await product.save();
  res.redirect("/products");
});

/// Delete a Product by id
router.get("/delete/:id", loginAuth, adminAuth, async function (
  req,
  res,
  next
) {
  await product_model.findByIdAndDelete(req.params.id);

  res.redirect("/products");
});

/// Update a Product by id
router.get("/update/:id", loginAuth, adminAuth, async function (
  req,
  res,
  next
) {
  let product = await product_model.findById(req.params.id);
  res.render("products/update", {
    product,
  });
});

///// Update product in DB
router.post("/update/:id", addProductAuth, async function (req, res, next) {
  let product = await product_model.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;

  await product.save();
  res.redirect("/products");
});

/// Add product to cart....How to save data in cookies...Add items to cart
router.get("/cart/:id", async function (req, res, next) {
  let product = await product_model.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  console.log(product);

  res.redirect("/products");
});

module.exports = router;
