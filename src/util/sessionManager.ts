import { randomBytes } from "crypto";

let sessions = new Map<string, number>();

function newToken(expireIn: number, bytes: number): string {
	let sessionToken;

	do {
		sessionToken = randomBytes(bytes).toString("hex");
	} while (sessions.get(sessionToken));

	sessions.set(sessionToken, Date.now() + expireIn);

	setTimeout(() => {
		sessions.delete(sessionToken);
	}, expireIn);

	return sessionToken;
}

function isTokenValid(token: string): boolean {
	const date = sessions.get(token);

	if (!date) {
		return false;
	}

	if (date < Date.now()) {
		return false;
	}

	return true;
}

export { newToken, isTokenValid };
