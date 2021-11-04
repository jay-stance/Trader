const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("POST ROUTE");
});

module.exports = router;
