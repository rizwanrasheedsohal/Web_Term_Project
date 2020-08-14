var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
  });
});

/* List all items from cookies */
router.get("/cart", function (req, res, next) {
  if (req.cookies.cart) {
    cart = req.cookies.cart;
  } else {
    cart = [];
  }
  res.render("cart", {
    cart,
  });
});

/* Delete items from cookies */
router.get("/cart/remove/:id", function (req, res, next) {
  let cart = [];

  if (req.cookies.cart) {
    cart = req.cookies.cart;
  } else {
    cart = [];
  }

  let index = cart.findIndex((c) => c._id == req.params.id);

  cart.splice(index, 1);
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
