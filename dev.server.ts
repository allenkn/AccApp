import {createServer, IncomingMessage, ServerResponse, STATUS_CODES, Server} from 'http';
import {parse, UrlWithParsedQuery} from 'url';

import {environment} from './src/environments/environment';

// This will eventually be in a model, pending re-organization
interface UserRegistrationRequest {
	username: string;
	password: string;
	email: string;
}

// This too. It doesn't need to actually hold passwords, since we don't bother with that in the dev
// environment.
interface User {
	username: string;
	email: string;
}

// and this is just something I'm used to, but you don't need to bother with at all.
interface Alert {
	level: string;
	text: string;
}

// Normally you'll probably want to use sqlite or something for a database, but to store only a
// handful of only one data type, this will do.
const USERS = new Map<number, User>();

// This mimicks a serial database type - 'course I gotta remember to keep updating it manually, so
// it's a poor implementation.
let USER_ID = 0;

// this is a "user-defined type guard" which checks that an object implements an interface
// at runtime - which is necessary because by then the interface doesn't actually exist.
// The alternative is to do "if (obj.username && obj.password && obj.email)" every time you want to
// know if an object implements an interface, which is very repetitive.
function isUserRegistrationRequest(obj: any): obj is UserRegistrationRequest {
	return obj !== undefined && obj !== null && obj.hasOwnProperty('username') && obj.hasOwnProperty('password') && obj.hasOwnProperty('email');
}


function registerUser(req: IncomingMessage, res: ServerResponse) {
	console.log("registering user")
	let data = "";
	req.on('readable', () => {
		const chunk = req.read();
		if (chunk) {
			data += chunk;
		}
	});
	req.on('end', () => {
		try {
			data = JSON.parse(data);
		} catch (e) {
			console.error(e);
			res.writeHead(400, STATUS_CODES[400]);
			res.write("Invalid JSON\n");
			res.end();
			return;
		}

		console.dir(data);
		if (isUserRegistrationRequest(data)) {
			// mimicking uniqueness constrain
			for (const u of USERS.values()) {
				if (u.username === data.username) {
					res.writeHead(409,STATUS_CODES[409]);
					res.write(`A user named ${data.username} already exists!\n`);
					res.end();
					console.log("conflict written");
					return;
				} else if (u.email === data.email) {
					res.writeHead(409, STATUS_CODES[409]);
					res.write(`A user with the email address ${data.email} already exists!\n`);
					res.end();
					console.log("conflict written");
					return;
				}
			}

			const newUser: User = {username: data.username, email: data.email};
			USERS.set(++USER_ID, newUser);
			res.writeHead(201, STATUS_CODES[201], {"Content-Type": "application/json"});
			res.write(`${JSON.stringify(newUser)}`);
			res.write('\n');
			res.end();
			console.log("success written");
		} else {
			res.writeHead(400, STATUS_CODES[400]);
			res.write("Request body does not represent a user registration request\n");
			res.end();
			console.log("bad request written");
		}
	});
}

function cors(req: IncomingMessage, res: ServerResponse) {
	res.writeHead(200, STATUS_CODES[200], {
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie",
		"Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE,PATCH,TRACE,CONNECT,BREW",
		"Access-Control-Allow-Origin": "*"
	});
	res.end();
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
	console.log(`Handling ${req.method} ${req.url}`);

	if (req.url === "/api/users" || req.url === "/api/users/") {
		console.log("path found")
		if (req.method.toLowerCase() === "post") {
			console.log("handling POST");
			registerUser(req, res);
		} else if (req.method.toLowerCase() === "options") {
			console.log("handling OPTIONS");
			cors(req, res);
		} else {
			console.log("not implemented written");
			res.writeHead(501, STATUS_CODES[501], {"Accept": "POST"});
			res.end();
		}
	} else {
		console.log("not found written")
		res.writeHead(404, STATUS_CODES[404]);
		res.write("");
		res.end();
	}
});

console.log(`Starting up mock dev server on port ${environment.PORT}`);
server.listen(environment.PORT);