import { selectScript } from '/selectScript.js';

selectScript('delay')
	.then(script => selectScript('field'))
	.then(script => selectScript('value'))
	.then(script => {
		console.log(alertFinished());
		console.log(testValue);
		console.log(delay(1000).then(result => console.log('delayed!')))
	})

class Thenable {
	constructor(num) {
		this.num = num;
	}
	then(resolve, reject) {
		alert(resolve); // function() { native code }
		// будет успешно выполнено с аргументом this.num*2 через 1 секунду
		setTimeout(() => resolve(this.num * 2), 1000); // (**)
	}
}

new Promise(resolve => resolve(1))
	.then(result => {
		return new Thenable(result); // (*)
	})
	.then(alert); // показывает 2 через 1000мс

// fetch('user.json')
// 	.then(response => response.json())
// 	.then(user => fetch(`github.com/users/${user.name}`))
// 	.then(response => response.json())
// 	.then(githubUser => new Promise(function(resolve, reject) {
// 		let pic = document.createElement('img');
// 		pic.src = githubUser.avatar_url;
// 		pic.className = 'profilePic';
// 		document.body.append(pic)
// 		setTimeout(() => {
// 			pic.remove()
// 			resolve(githubUser)
// 		}, 2000);
// 	}))
// 	.then(`${githubUser.name}'s Avatar Showcase has ended.`)
// 	// ANY Error returned by one of .then's
// 	.catch(error => alert(error.message))


// Invisible try() & catch()
// fetch('url-that-never-was.net')
// 	.then(response => response.json)
// 	.catch(error => alert(error))
// OR
// Invisible try() & catch()
// fetch('url-that-never-was.net')
// 	.then(response => blabla()) // NO SUCH FUNCTION
// 	.catch(error => alert(error))
// .catch CATCHes it anyway!

// let urls = [
// 	'https://vk.com/alivenomatterwhat',
// 	'https://www.last.fm/user/lifemaintenance',
// 	'https://twitter.com/AL1V33'
// ]

// let requests = urls.map(url => fetch(url))
// Promise.all(requests)
// 	.then(responses => responses.forEach(
// 		response => console.log(response.url)
// 	));


let names = ['iliakan', 'remy', 'jeresig'];
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
	.then(responces => {
		for (let responce of responces) {
			console.log(responce.url)
		}
		return responces
	})
	.then(responces => Promise.all(responces.map(responce => responce.json())))
	.then(users => users.forEach(user => console.log(user.name)))

// If ANY of the Promise.all promises returns an error - 
// Promise.all ends on that moment and returns that error
Promise.all([
	new Promise(function (resolve, reject) { setTimeout(() => resolve(1), 1000); }),
	new Promise(function (resolve, reject) { setTimeout(() => reject(new Error('2')), 2000); }),
	new Promise(function (resolve, reject) { setTimeout(() => resolve(3), 3000); })
])
	.catch(error => console.log(`Error! (${error})`))

Promise.all([
	new Promise(function (resolve, reject) { setTimeout(() => resolve(1), 1000); }),
	2,
	new Promise(function (resolve, reject) { setTimeout(() => resolve(3), 3000); }),
]).then(console.log) // -> 1, 2(!), 3. As it is

let urls = [
	'https://api.github.com/users/iliakan',
	'https://api.github.com/users/remy',
	'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
	.then(requests => requests.forEach((request, num) => {
		if (request.status == 'fulfilled') console.log(`${urls[num]}: ${request.value.status}`)
		if (request.status == 'rejected') console.log(`${urls[num]}: ${request.reason}`)
	}))

if (!Promise.allSettled) {
	Promise.allSettled = function (promises) {
		return Promise.all(promises.map(p => Promise.resolve(p)
			.then(value => ({
				status: 'fulfilled',
				value: value
			}), error => ({
				status: 'rejected',
				reason: error
			}))));
	};
}


Promise.race([
	new Promise(function (resolve, reject) { setTimeout(() => resolve(1), 1000) }),
	new Promise(function (resolve, reject) { setTimeout(() => reject(new Error('2')), 2000) }),
	new Promise(function (resolve, reject) { setTimeout(() => resolve(3), 3000) })
])
	.then(console.log)
// -> 1 returns the FASTEST Promise


