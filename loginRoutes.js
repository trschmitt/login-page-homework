const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.render("index", {});
})


router.post("/form", (req, res) => {
	console.log("New Request", req.body);

//Can't figure out how to get the session and cookie to transfer to the router branch and then show that user name and store the cookie to be used as an identifier.
  console.log(req.session.name);
  req.checkBody("name", "You must provide a valid User name.").notEmpty();
	req.getValidationResult().then((result) => {
		if (!result.isEmpty()) {
			res.render("index", {error: "MISTAKE!! Please enter a name."});
			return;
		}
		res.redirect("/");
	});
});
