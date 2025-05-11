import { Router, urlencoded } from "express";
import { join } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";

import formatDate from "../util/formatDate";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	// Add restart inititiation times if possible
	let servers = config.servers;

	for (let i in servers) {
		let server = servers[i];

		const filePath = join(__dirname, "../../", server.path);

		if (!existsSync(filePath)) {
			continue;
		}

		let fileContent = readFileSync(filePath).toString();

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

	res.render(join(__dirname, "../views/dashboard.ejs"), { basePath: config.basePath, servers: config.servers, status: req.query.status, result: req.query.result });
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

			const filePath = join(__dirname, "../../", server.path);

			try {
				writeFileSync(filePath, Date.now().toString());
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

	res.redirect(req.baseUrl + "?" + params.toString());
});

export default router;
