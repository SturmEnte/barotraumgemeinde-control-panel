import express from "express";
import { join } from "path";

import isConfigValid from "./util/isConfigValid";

// Config
const config = require("../config.json");

console.log("Validating config...");

if (!isConfigValid(config)) {
	process.exit(1);
}

console.log("Config validatet");

// Server setup
import loginRouter from "./auth/login";

const app = express();

app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "public")));

app.use("/login", loginRouter);

app.listen(config.port, () => {
	console.log("Backend listening to port", config.port);
});
