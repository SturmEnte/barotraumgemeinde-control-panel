import { Router } from "express";
import { join } from "path";

import { newToken } from "../util/sessionManager";

const config = require("../../config.json");

const router = Router();

router.get("/", (req, res) => {
	res.send("Hello World");
});

export default router;
