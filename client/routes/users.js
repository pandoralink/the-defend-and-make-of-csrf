const express = require("express");
const useName = require("../utils/useName");
const router = express.Router();

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
  const [name, setName] = useName();

  res.send(name);
});

router.post("/name", function (req, res, next) {
  const [name, setName] = useName();
  const { name: updateName } = req.body;

  res.send(setName(updateName));
});

module.exports = router;
