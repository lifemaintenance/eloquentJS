// function first() {
// 	setTimeout(() => console.log(1), 500);
// }
// function second() {
// 	console.log(2)
// }

// first();
// second();

function doHomework(subject, callback) {
	alert(`Starting my ${subject} homework.`);
	callback();
}

function alertFinished() {
	alert('Finished my homework.')
}

