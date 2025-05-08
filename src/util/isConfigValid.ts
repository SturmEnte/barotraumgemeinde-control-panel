export default function (config: any) {
	if (!config) {
		console.log("Invalid config");
		return false;
	}

	// Port
	if (!config.port) {
		console.log("Port not defined");
		return false;
	}

	if (isNaN(Number(config.port))) {
		console.log("Port is not a number");
		return false;
	}

	// Password
	if (!config.password) {
		console.log("Password not defined");
		return false;
	}

	// Sessions
	if (!config.sessions) {
		console.log("Session settings not defined");
		return false;
	}

	if (!config.sessions.expireIn) {
		console.log("Session expiry time not defined");
		return false;
	}

	if (isNaN(Number(config.sessions.expireIn))) {
		console.log("Session expiry time is not a number");
		return false;
	}

	if (!config.sessions.tokenBytes) {
		console.log("Session token bytes not defined");
		return false;
	}

	if (isNaN(Number(config.sessions.tokenBytes))) {
		console.log("Session token bytes is not a number");
		return false;
	}

	// Servers
	if (!config.servers) {
		console.log("No servers defined");
		return false;
	}

	for (let i = 0; i < config.servers.length; i++) {
		const server = config.servers[i];

		if (!server.id) {
			console.log(`Server ${i}'s ID not defined`);
			return false;
		}

		if (!server.name) {
			console.log(`Server ${i}'s name not defined`);
			return false;
		}

		if (!server.path) {
			console.log(`Server ${i}'s path not defined`);
			return false;
		}
	}

	return true;
}
