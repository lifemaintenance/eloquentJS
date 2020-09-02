function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}

let someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(randomPick(someArray))
console.log(randomPick(someArray))
console.log(randomPick(someArray))
console.log(randomPick(someArray))
console.log(randomPick(someArray))

let secondArray = [1, 5, 5, 5, 1]

console.log(secondArray.findIndex(element => element == Math.max(...secondArray)))
console.log(Math.max(...secondArray))