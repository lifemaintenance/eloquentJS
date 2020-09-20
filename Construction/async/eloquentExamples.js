new Promise((_, reject) => reject(new Error('Failed.')))
	.then(result => console.log('First Handler: ' + result))
	// .catch так же как и Промис возвращает после себя на своё место аргумент. И .then может брать и работать с ним так же как и с Промисом!
	.catch(reason => {
		console.log('Reason of a Fail: ' + reason);
		return reason
	})
	.then(arg => console.log('Second Handler (Argument caught by .catch): ' + arg))

class Timeout extends Error { }

function request(nest, target, type, content) {
	return new Promise((resolve, reject) => {
		let done = false;
		function attempt(n) {
			nest.send(target, type, content, (failed, value) => {
				done = true;
				if (value) resolve(value);
				else reject(failed);
			});
			// Промис может Резалв или Реджект только 1 раз. Не смотря на это функция будет работать правильно.
			// Повторное выполнение в данном случае можно оформить только через рекурсию.
			// СетТаймаут запускается через 250 миллисекунд если не произошло никакой реакции с момента начала.
			// В этом случае он либо запускает следующую попытку, либо, если это была третья, делает Реджект по причине Таймд Аута
			setTimeout(() => {
				if (done) return;
				else if (n < 3) attempt(n + 1);
				else reject(new Timeout('Timed out.'));
			}, 250);
		}
		attempt(1)
	})
}

// import { everywhere } from "./crow-tech";

// everywhere(nest => {
// 	nest.state.gossip = [];
// });

// function sendGossip(nest, message, exceptFor = null) {
// 	nest.state.gossip.push(message);
// 	for (let neighbor of nest.neighbors) {
// 		if (neighbor == exceptFor) continue;
// 		request(nest, neighbor, "gossip", message);
// 	}
// }

// requestType("gossip", (nest, message, source) => {
// 	if (nest.state.gossip.includes(message)) return;
// 	console.log(`${nest.name} received gossip '${message}' from ${source}`);
// 	sendGossip(nest, message, source);
// });

// yield отдает текущее состояние элемента и паузит код, ждёт следующего обращения к next элементу итератора 
function* powers(n) {
	for (let current = n; ; current *= n) {
		current += 1;
		console.log('Will be Multiplied:' + current);
		yield current;
	}
}

for (let power of powers(3)) {
	if (power > 50) break
	console.log(power)
}

let start = Date.now();
setTimeout(() => {
	console.log('Timeout ran at:', Date.now() - start)
}, 20);
while (Date.now() < start + 50) { }
console.log('Time wasted until', Date.now() - start)

Promise.resolve('Done.').then(console.log)
console.log('Me First!');