const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with more than 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json([{ errors: "Invalid Credentials" }]);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json([{ errors: "Invalid Credentials" }]);

    return res.status(200).json({ token: user.generateAuthToken() });
  }
);

module.exports = router;
