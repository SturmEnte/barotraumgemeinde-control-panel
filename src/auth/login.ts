import { Router } from "express";
import { join } from "path";

const router = Router();

router.get("/", (req, res) => res.sendFile(join(__dirname, "../", "views", "login.html")));

router.post("/", (req, res) => {
	console.log(req.body);
	res.send(":)");
});

export default router;
