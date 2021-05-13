/** @format */

const express = require("express");
const serv = express();
const morgan = require("morgan");
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routers/userRouter");
const indexRouter = require("./routers/indexRouter");
const formRouter = require("./routers/formRouter");
const mongoose = require("mongoose");
const sessions = require("express-session"); //для чтения сессии
const MongoStore = require("connect-mongo"); // для хранения сессии в базе данных mongoDB

serv.set("view engine", "hbs");
serv.set("cookieName", "sid");

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Для подписания сессий необходима секретная строка
// require('crypto').randomBytes(64).toString('hex')
const secretKey =
  "cf95aegweg2trth4th4th4t800e9bf6e5454g3tg3tg3tg3567e625ac043326f2777d3b17a21e00d4b33dab26739b3f2de63d9506f17b228050";

serv.use(
  sessions({
    name: serv.get("cookieName"),
    secret: secretKey,
    resave: false, // Не сохранять сессию, если мы ее не изменим
    saveUninitialized: false, // не сохранять пустую сессию
    // store: new FileStore({ // выбираем в качестве хранилища файловую систему
    //   secret: secretKey,
    // }),
    store: MongoStore.create({
      // выбираем в качестве хранилища mongoDB
      mongoUrl: "mongodb://localhost:27017/kuda",
    }),
    cookie: {
      // настройки, необходимые для корректного работы cookie
      // secure: true,
      httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
      maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
    },
  })
);

serv.use(express.static("public"));
serv.use(express.json());
serv.use(express.urlencoded({ extended: true }));
serv.use(morgan("dev"));

serv.use((req, res, next) => {
  const userId = req.session?.user?.id;
  if (
    userId ||
    req.path === "/" ||
    req.path === "/user/signup" ||
    req.path === "/user/signin"
  ) {
    return next();
  }
  return res.redirect("/user/signup");
});

serv.use("/", indexRouter);
serv.use("/user", userRouter);
// serv.use("/form", formRouter);

serv.listen(4000, () => {
  console.log("serverUP");
  mongoose.connect("mongodb://localhost:27017/kuda", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("poshel");
});
