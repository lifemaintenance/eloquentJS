async function myFirstAsyncFunction() {
	let innerPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Done!')
		}, 1000);
	})

	let result = await innerPromise;
	console.log(result)
}

myFirstAsyncFunction()
console.log('hi')

async function showAvatar(userName) {
	let response = fetch('blahblah.com')
	let user = await response.json();

	let githubResponse = fetch(`blahblah/${user.name}`);
	let githubUser = await githubResponse.json();

	img = document.createElement('img');
	img.src = githubUser.avatar_url;
	img.className = 'examplePromiseImage';
	document.body.append(img);

	await new Promise((resolve, reject) => setTimeout(resolve, 3000))

	img.remove();

	return githubUser;
}

// Await / Async нельзя использовать на верхнем уровне вложенности (Распространенная ошибка)
// Для обхода можно завернуть код в анонимную async-функцию
// (async () => {
// 	let response = await fetch('/article/promise-chaining/user.json');
// 	let user = await response.json();
//   })();

// Await работает с Thenable обьектами
// (если у обьекта есть .then. то можно использовать await)
class Thenable {
	constructor(num) {
		this.num = num;
	}

	then(resolve, reject) {
		console.log(resolve)

		setTimeout(() => {
			resolve(this.num * 2)
		}, 1000);
	}
};

async function thenableExample() {
	let result = await new Thenable(1);
	console.log(result)
}

thenableExample()


async function getUserInfo() {
	try {
		let response = await fetch('blahblah.com');
		let user = (await response).json;
	} catch (err) {
		console.log(`Failed to get user data.(${err})`)
	}
}

// Вместо Try & Catch можно использовать .catch вместе с промисом (который при внутренней ошибке будет возвращаться завершенный в состоянии rejected)
async function getUserInfo2() {
	let response = await fetch('blahblah.com')
}

getUserInfo2().catch(console.log)

