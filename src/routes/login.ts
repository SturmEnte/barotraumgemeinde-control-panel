import { Router, urlencoded } from "express";
import { compareSync } from "bcrypt";
import { join } from "path";

import { newToken } from "../util/sessionManager";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => res.render(join(__dirname, "../", "views", "login.ejs")));

router.use(urlencoded());

router.post("/", (req, res) => {
	let error;

	if (!req.body || !req.body.password) {
		error = "Oops! You forgot to enter your password.";
	}

	if (!compareSync(req.body.password, config.password)) {
		error = "Oops! The password is incorect.";
	}

	if (error) {
		res.render(join(__dirname, "../views/login.ejs"), { error });
		return;
	}

	res.cookie("session", newToken(config.sessions.expireIn, config.sessions.tokenBytes), { path: "/", httpOnly: true, maxAge: config.sessions.expireIn }).redirect("/dashboard");
});

export default router;
