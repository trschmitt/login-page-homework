const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const login = require("./loginRoutes");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(morgan("dev"));

app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views += 1;
  next();
})

let user = {
  name: "person",
  email: "email@email.com",
  password: "password"
};

app.use("/", (req, res, next) => {
  if (req.body.name === user.name) {
    req.session.name = req.body.name;
    console.log(req.session);
    return;
  }
  next();
})

app.use(session({
  secret: 's1744439857-jshaf348957uo-eusjdflhaksjhd',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (req.body.password === user.email) {
    if (req.body.email === user.email) {
      req.session.login = true;
      req.session = user.name;
    }
  }
  next();
})

app.use(login);

app.listen(3010, () => {
	console.log("Successfully running at http://localhost:3010");
});
