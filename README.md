# Barotraumgemeinde Control Panel

## About

This is the control panel of the Barotraumgemeinde Barotrauma server.

## Config
The config is a simple *config.json* file in the root directory of the server (where the package.json can be located). The config should look like this:
```json
{
	"listenHostname": "localhost",
	"listenPort": 3000,
	"basePath": "/xyz",
	"password": "$2b$10$JCJqEdUFbbv6kve9IPZNAu1.e07jHzQHLr9KTJ2XpieYg/xiey7.G",
	"sessions": {
		"expireIn": 600000,
		"tokenBytes": 20
	},
	"servers": [
		{
			"name": "Server 1",
			"id": "s1",
			"path": "./restarts/server1"
		},
		{
			"name": "Server 2",
			"id": "s2",
			"path": "/home/user/server2.txt"
		}
	]
}
```
- `listenHostname` the hostname the server will listen to. If it is not set, will 0.0.0.0 be used
- `listenPort` is the port the server will listen to. If it is not set, will 3000 be used
- `basePath` allows the server to work with reverse proxies. It will put the base url before redirects and resources on the site like css files. By default will none (equivalent to an empty string) be used
- `password` is the desired password for accessing the dashboard. It has to be hashed and saltet with bcrypt. This has to be set
- `sessions.expireIn` is the time in milliseconds a session can last at most. The default value for this is 1 hour (3600000 ms)
- `session.tokenBytes` is the amount of bytes a session token consists of. The default value for this is 20
- `servers` is a array of server objects. A servers has to have a name, id and path. The path can be relative or absolute. The relative path will start from the root directory of the project. In the example above has Server 1 a relative path and Server 2 an absolute path. You have to at least put one server into the config in order for the server to start working

## Running the project
You either can build the project and then run in the root directory of the "compiled" project `npm run start` or you can run `npm test` directly in the uncompiled projects directory.
Either way you have to run `npm install` in the root directory of the project wether compiled or uncompiled.

## Building
In order to build the project you have to have at least some of the dependencies installed. The easiest way to accomplishe this is by running `npm install` in the projects directory.
After that you just have to run `npm run build`. The "compiled" project will be in the newly created build folder.
The `node_modules` folder will not be copied so you have to run `npm install` in the build directory again.

## Issues
I developed the project with Node.js `v22.15.0` and npm `11.3.0`. \
If you have any issues please make sure the cause is not an unsupported Node.js or npm version.
Please provide a detailed description on what you have to do to get the issue and provide error logs if there are any for the issue.
