import { Router, urlencoded } from "express";
import { join } from "path";
import { writeFileSync } from "fs";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	res.render(join(__dirname, "../views/dashboard.ejs"), { servers: config.servers, status: req.query.status, result: req.query.result });
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
				console.log("Initiated restart at " + Date.now());
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
