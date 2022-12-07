var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("2022-12-07-22:08"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const { userId } = req.signedCookies;
  if (req.path !== "/user/login" && !userId) {
    res.status(404);
    res.send("error");
  } else {
    next();
  }
});

app.use("/user", usersRouter);

module.exports = app;
