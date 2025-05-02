import { Router, json } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.use(json());

router.post("/login", (req, res) => {
	if (!req.body || !req.body.password) {
		res.status(400).json({ error: "No password in body" });
		return;
	}

	const password = req.body.password;

	if (!bcrypt.compareSync(password, "$2b$10$JCJqEdUFbbv6kve9IPZNAu1.e07jHzQHLr9KTJ2XpieYg/xiey7.G")) {
		res.status(400).json({ error: "Invalid password" });
		return;
	}

	res.sendStatus(200);
});

export default router;
