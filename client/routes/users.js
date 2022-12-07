const express = require("express");
const router = express.Router();

let name = "杰尼龟";

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  res.cookie("userId", String(username), {
    expires: new Date(Date.now() + 1000 * 60 * 60),
    httpOnly: true,
    signed: true,
  });
  res.send("success");
});

router.get("/name", function (req, res, next) {
  res.send(name);
});

router.post("/name", function (req, res, next) {
  const { name: updateName } = req.body;
  name = updateName;
  res.send(name);
});

module.exports = router;
