import { Router } from "express";
import { join } from "path";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	res.render(join(__dirname, "../views/dashboard.ejs"), { servers: config.servers });
});

export default router;
