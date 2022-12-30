var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var initRouter = require("./routes/init");
const { expressjwt: jwt } = require("express-jwt");
const jwtConfig = require("./config/jwt.config");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("2022-12-07-22:08"));
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: function (res, path, stat) {
      if (res) {
        // TODO: 后期使用 monorepo 分割不同版本的例子，便于查看和分享
        // res.setHeader("X-Frame-Options", "DENY");
      }
    },
  })
);
app.use(
  jwt({ secret: jwtConfig.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/v/, /^\/user\/login/, /^\/user\/v3\/login/, /\/favicon\.ico/],
  })
);

app.use((req, res, next) => {
  const { userId } = req.signedCookies;
  // 兼容 v3 token 鉴权版本和 v2 cookie 鉴权版本
  if (
    req.path !== "/favicon.ico" &&
    req.path !== "/user/login" &&
    req.path !== "/user/v3/login" &&
    req.path !== "/user/follow" &&
    req.path !== "/init" &&
    !userId
  ) {
    res.status(403);
    res.send("error");
  } else {
    next();
  }
});

app.use("/", initRouter);
app.use("/user", usersRouter);

module.exports = app;
