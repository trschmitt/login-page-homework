const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.redirect("/success");
  } else {
    res.render("index", {});
  }
});

router.get("/loggedIn", (req, res) => {
  console.log("Working?");
  if (req.session.login === true) {
    res.render("success", { user: req.session });
  } else {
    res.redirect("/");
  }
});

router.post("/form", (req, res) => {
  if (req.session.login === true) {
    res.redirect("/loggedIn");
  } else {
    res.redirect("/");
  }
  req.checkBody("name", "You must provide a valid User name.").notEmpty();
  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      res.render("index", { error: "MISTAKE!! Please enter a name." });
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;
