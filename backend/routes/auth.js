const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ error: `${field} already exists` });
    } else if (error.errors) {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors.join(", ") });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user: { name: user.name } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/me", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.status(200).json({ user: { name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signout", (req, res) => {
  res.status(200).json({ message: "User signed out successfully!" });
});

module.exports = router;
