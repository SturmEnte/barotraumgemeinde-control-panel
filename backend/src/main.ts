import express from "express";

import authRouter from "./api/auth";

const PORT = 3000;

const app = express();

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log("Backend listening to port", PORT);
});
