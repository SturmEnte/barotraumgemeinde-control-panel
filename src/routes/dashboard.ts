import { chdir } from "process";
import { Router, urlencoded } from "express";
import { join } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";

import formatDate from "../util/formatDate";

// Change the working directory to the root directory of the project
// This is to enable relative and absolute paths in the config
chdir(join(__dirname, "../../"));

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	// Add restart inititiation times if possible
	let servers = JSON.parse(JSON.stringify(config.servers));

	for (let i in servers) {
		let server = servers[i];

		if (!existsSync(server.path)) {
			continue;
		}

		let fileContent = readFileSync(server.path).toString();

		if (!fileContent) {
			continue;
		}

		let date = new Date(Number(fileContent));

		// Check if the date object is valid to prevent errors showing on the website due to invalid timestamps
		if (isNaN(date.getTime())) {
			continue;
		}

		server.restartInitiatedAt = formatDate(date);
	}

	res.render(join(__dirname, "../views/dashboard.ejs"), { basePath: config.basePath, servers: servers, status: req.query.status, result: req.query.result });
});

router.use(urlencoded());

router.post("/restart", (req, res) => {
	let id: string;
	let status: string = "0"; // 0 = fail, 1 = success
	let result: string = "Invalid id";

	if (!req.body || !req.body.id) {
		result = "No id given";
	} else {
		id = req.body.id;

		for (let i = 0; i < config.servers.length; i++) {
			let server = config.servers[i];

			if (server.id != id) {
				continue;
			}

			try {
				writeFileSync(server.path, Date.now().toString());
				console.log("Initiated restart at " + formatDate(new Date()));
				result = "Initiated restart";
				status = "1";
			} catch (err) {
				console.error(err);
				result = "Error while initiating restart";
			}

			break;
		}
	}

	const params = new URLSearchParams({ status, result });

	res.redirect(config.basePath + "/dashboard?" + params.toString());
});

router.post("/stop-restart", (req, res) => {
	let id: string;
	let status: string = "0"; // 0 = fail, 1 = success
	let result: string = "Invalid id";

	if (!req.body || !req.body.id) {
		result = "No id given";
	} else {
		id = req.body.id;

		for (let i = 0; i < config.servers.length; i++) {
			let server = config.servers[i];

			if (server.id != id) {
				continue;
			}

			try {
				writeFileSync(server.path, "");
				console.log("Stopped restart restart at " + formatDate(new Date()));
				result = "Stopped restart";
				status = "1";
			} catch (err) {
				console.error(err);
				result = "Error while stopping restart";
			}

			break;
		}
	}

	const params = new URLSearchParams({ status, result });

	res.redirect(config.basePath + "/dashboard?" + params.toString());
});

export default router;
