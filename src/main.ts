import express from "express";
import cookieParser from "cookie-parser";
import { join } from "path";

import { isTokenValid } from "./util/sessionManager";

import isConfigValid from "./util/isConfigValid";

// Config
const config = require("../config.json");

console.log("Validating config...");

if (!isConfigValid(config)) {
	console.log("Config invalid. Please adjust it accordingly. What and how it needs to be included in the config can be seen in the README.");
	process.exit(1);
}

console.log("Config validated");

// Server setup
import loginRouter from "./routes/login";
import dashboardRouter from "./routes/dashboard";

const app = express();

app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "../public")));

app.use("/login", loginRouter);

app.use(cookieParser());

app.all("*splat", (req, res, next) => {
	if (!req.cookies.session) {
		res.clearCookie("session").redirect("/login");
		return;
	}

	if (!isTokenValid(req.cookies.session)) {
		res.clearCookie("session").redirect("/login");
		return;
	}

	next();
});

app.use("/dashboard", dashboardRouter);

app.listen(config.port, () => {
	console.log("Server listening to port", config.port);
});
