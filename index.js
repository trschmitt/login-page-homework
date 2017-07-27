const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(require("./loginRoutes"));

app.use(session({
  secret: 's1744439857-jshaf348957uo-eusjdflhaksjhd',
  resave: false,
  saveUninitialized: false
}));


let user = {
  name: "user",
  email: "email@email.com",
  password: "password"
};

app.use((req, res, next) => {
	console.log(req.sessions);
	if (!req.session.views) {
		req.session.views = 0;
	}
	req.session.views += 1;
	next();
})

app.use((req, res, next) => {
  if (req.body.name === user.name) {
    req.session.name = req.body.name;
    return;
  }
  next();
})

app.use((req, res, next) => {

})

app.listen(3010, () => {
	console.log("Successfully running at http://localhost:3010");
});
