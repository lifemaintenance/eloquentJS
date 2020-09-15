class HttpError extends Error {
	constructor(response) {
		super(`${response.status} for ${response.url}`);
		this.name = 'HttpError';
		this.response = response;
	}
}

async function loadJson(url) {
	let response = await fetch(url)
	if (response.status == 200) return response.json();
	else throw new HttpError(response);
}

async function demoGithubUser() {
	let user;
	while (true) {
		let name = prompt('Enter your login', 'lifemaintenance');
		try {
			user = await loadJson(`https://api.github.com/users/${name}`);
			break;
		} catch (err) {
			if (err instanceof HttpError && err.response.status == 404) {
				console.log('there is no such user. try again');
			} else throw err;
		}
	}
	console.log(`Full Name: ${user.name}`);
	return user;
}

demoGithubUser();