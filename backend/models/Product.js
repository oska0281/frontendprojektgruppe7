const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  rebateQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  rebatePercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  upsellProductId: {
    type: String,
    default: null,
   
  },
});

ProductSchema.index({ id: 1 });
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
