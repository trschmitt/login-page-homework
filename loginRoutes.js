const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.render("index", {});
})

let users = [];

router.post("/userForm", (req, res) => {
	console.log("New Request", req.body);
	req.checkBody("userName", "You must provide a valid User name.").notEmpty();
	req.getValidationResult().then((result) => {
		if (!result.isEmpty()) {
			res.render("index", {error: "MISTAKE!! Please enter a name."});
			return;
		}
		users.push({
			name: req.body.name,
			createdAt: new Date()
		});
		res.redirect("/");
	});
});

/******
1. need one router page for login form
2. need to post userForm when login button is selected.
3. on successful login post a success message to form page
4. on failure take back to index page and show an error.
******/
