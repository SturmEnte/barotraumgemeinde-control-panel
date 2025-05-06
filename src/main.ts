import express from "express";

import isConfigValid from "./util/isConfigValid";

import authRouter from "./api/auth";

const config = require("../config.json");

console.log("Validating config...");
if (!isConfigValid(config)) {
	process.exit(1);
}
console.log("Config validatet");

const app = express();

app.use("/api/auth", authRouter);

app.listen(config.port, () => {
	console.log("Backend listening to port", config.port);
});
