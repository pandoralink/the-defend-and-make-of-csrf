const express = require("express");
const useName = require("../utils/useName");
const router = express.Router();

router.post("/init", function (req, res, next) {
  const [name, setName] = useName();

  // 初始化用户名称
  setName();
  res.send("success");
});

module.exports = router;
