const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const productSchema = mongoose.Schema({
  id: String,
  name: String,
  size: String,
  price: Number,
  category: String,
});

function validateProduct(data) {
  const schema = joi.object({
    id: joi.string().min(2).max(5).required(),
    name: joi.string().min(3).max(15).required(),
    size: joi.string().min(1).max(7).required(),
    price: joi.number().min(0).required(),
    category: joi.string().min(0).required(),
  });
  return schema.validate(data);
}

const productModel = mongoose.model("products", productSchema);

module.exports.product_model = productModel;
module.exports.validate = validateProduct;
