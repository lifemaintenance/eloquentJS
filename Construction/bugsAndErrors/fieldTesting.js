// function spotTheProblem() {
// 	for (counter; counter < 10; counter++) {
// 		console.log(counter)
// 	}
// }

// spotTheProblem()
'use strict'
function Person(name) { this.name = name }
let someGuy = new Person('Max')
console.log(name)

function promptNumber(question) {
	let result = Number(prompt(question));
	if (Number.isNaN(result)) return null;
	else return result;
}

console.log(promptNumber("How many trees do you see?"));

function lastElement(array) {
	if (array.length == 0) return { failed: true }
	return { element: array[array.length - 1] }
}

console.log(lastElement([1, 2, 3]))
console.log(lastElement([]))

class InputError extends Error { }

function directionSelect(question) {
	let result = prompt(question);
	if (result.toLowerCase() == 'left') return 'L';
	if (result.toLowerCase() == 'right') return 'R';
	throw new InputError(`Wrong direction: ${result}`)
}

function whatYouSee(direction) {
	if (directionSelect('Which way?') == 'L') return 'a Bull';
	else return 'a Bear'
}

try {
	console.log(`You see ${whatYouSee()}.`);
} catch (error) {
	console.log(`Something went wrong: ${error}`)
}

let accounts = {
	first: 1000,
	second: 2000,
	third: 100
}

function selectAccount() {
	let account = prompt('Which account do you want to select?')
	if (accounts.hasOwnProperty(account)) return account
	throw new Error(`There is no such account (${account})`)
}

function transfer(from, amount) {
	if (accounts[from] < amount) return
	let progress = 0;
	try {
		accounts[from] -= amount;
		progress += 1;
		accounts[selectAccount()] += amount;
		progress += 1;
	} finally {
		if (progress == 1) accounts[from] += amount;
	}
}

transfer('first', 500)

console.log(accounts['first'])
console.log(accounts['second'])


try {
	let dir = directionSelect("Where?");
	console.log("You chose ", dir);
} catch (e) {
	if (e instanceof InputError) console.log("Not a valid direction. Try again.");
	else throw e
}