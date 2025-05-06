export default function (config: any) {
	if (!config) {
		console.log("Invalid config");
		return false;
	}

	if (!config.port) {
		console.log("Port not defined in config");
		return false;
	}

	if (isNaN(Number(config.port))) {
		console.log("Port is not a number");
		return false;
	}

	return true;
}
