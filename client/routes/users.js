const express = require("express");
const useFollow = require("../utils/useFollow");
const useName = require("../utils/useName");
const router = express.Router();
const jwt = require("../utils/jwt");
const { Result } = require("../types/index");

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

router.post("/v2/login", function (req, res, next) {
  const { username, password } = req.body;
  res.cookie("userId", String(username), {
    expires: new Date(Date.now() + 1000 * 60 * 60),
    httpOnly: true,
    signed: true,
  });
  res.send("success");
});

router.post("/v3/login", function (req, res, next) {
  const { username, password } = req.body;
  const user = { username, password: "" };
  const tokenStr = jwt.generate(user);

  return res.send(
    new Result({
      message: "登录成功",
      data: {
        token: "Bearer " + tokenStr,
      },
    })
  );
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

router.get("/follow", function (req, res, next) {
  const [count, setFollow] = useFollow();

  res.send(String(count));
});

router.post("/follow", function (req, res, next) {
  const [count, setFollow] = useFollow();

  res.send(setFollow(++count));
});

module.exports = router;
