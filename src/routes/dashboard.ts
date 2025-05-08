import { Router, urlencoded } from "express";
import { join } from "path";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	res.render(join(__dirname, "../views/dashboard.ejs"), { servers: config.servers });
});

router.use(urlencoded());

router.post("/restart", (req, res) => {
	let id: string;
	let result: string = "Invalid id";

	if (!req.body || !req.body.id) {
		result = "No id given";
	} else {
		id = req.body.id;

		for (let i = 0; i < config.servers; i++) {
			let server = config.servers[i];

			if (server.id != id) {
				continue;
			}

			// TBD Initiate restart
			result = "Initiated restart";
			break;
		}
	}

	const params = new URLSearchParams({ method: "restart", result });

	res.redirect(req.baseUrl + "?" + params.toString());
});

export default router;
