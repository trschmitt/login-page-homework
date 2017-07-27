const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.render("index", {});
})

router.post("/form", (req, res) => {
	console.log("New Request", req.body);

  req.checkBody("name", "You must provide a valid User name.").notEmpty();
	req.getValidationResult().then((result) => {
		if (!result.isEmpty()) {
			res.render("index", {error: "MISTAKE!! Please enter a name."});
			return;
		}
		res.redirect("/");
	});
});
