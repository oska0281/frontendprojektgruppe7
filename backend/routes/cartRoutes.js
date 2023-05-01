const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

router.post("/:productId", authMiddleware, async (req, res) => {
  const { quantity } = req.body;

  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.userId, "items.product": { $ne: product._id } },
      { $push: { items: { product: product._id, quantity } } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart" });
  }
});


router.put("/:productId", authMiddleware, async (req, res) => {
  const { quantity } = req.body;

  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.userId, "items.product": product._id },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.product");

    res.status(200).json({ message: "Product quantity updated", cart });
  } catch (error) {
    res.status(500).json({ error: "Error updating product quantity" });
  }
});

router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { $pull: { items: { product: product._id } } },
      { new: true }
    ).populate("items.product");

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Error removing product from cart" });
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
});

module.exports = router;
