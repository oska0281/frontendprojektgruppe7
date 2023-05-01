const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/sample", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route." });
});

module.exports = router;
