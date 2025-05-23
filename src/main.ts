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

// Make the public folder accessible
app.use(express.static(join(__dirname, "../public")));

app.use("/login", loginRouter);
app.get("/logout", (req, res) => {
	res.clearCookie("session").redirect(config.basePath + "/login");
});

app.use(cookieParser());

// Make sure that the dashboard is only accessible if the client is logged in
app.all("*splat", (req, res, next) => {
	if (!req.cookies.session) {
		res.clearCookie("session").redirect(config.basePath + "/login");
		return;
	}

	if (!isTokenValid(req.cookies.session)) {
		res.clearCookie("session").redirect(config.basePath + "/login");
		return;
	}

	next();
});

// Dashboard
app.all("/", (_, res) => {
	res.redirect(config.basePath + "/dashboard");
});

app.use("/dashboard", dashboardRouter);

// Catch all other sites and respond with not found
app.all("*splat", (req, res) => {
	res.status(404).render(join(__dirname, "./views/404.ejs"), { basePath: config.basePath });
});

app.listen(config.listenPort, config.listenHostname, () => {
	console.log("Server listening to", config.listenHostname + ":" + config.listenPort);
});
