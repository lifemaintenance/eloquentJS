let someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
function* test(array) {
	for (number of array) yield number
}

for (let number of test(someArray)) {
	console.log(number)
}

console.log('hi')