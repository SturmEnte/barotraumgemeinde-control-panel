import { Router } from "express";
import { join } from "path";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	res.send("Dashboard");
});

export default router;
