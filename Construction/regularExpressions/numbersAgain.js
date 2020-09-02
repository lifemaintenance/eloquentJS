// Fill in this regular expression.
let number1 = /^(-|\+)?(\d+[eE]?\.?)|(\.?\d+)^/g
let number2 = /^(-|\+)?(\d+[eE]?\.?)|(\.?\d+[eE]?)$/g
let number3 = /^(-|\+)?\.?\d+[eE]?\.?$/g
let number4 = /^(-|\+)?\d*\.?\d*[eE]?(-|\+)\d*$/g
let number5 = /^(-|\+)?\d*\.?\d*[eE]?\d*$/g
let number6 = /^(-|\+)?\d*\.?\d*([eE](-|\+)?)?\d*$/g
let number7 = /^(-|\+)?((\d+\.?\d*)|(\d*\.?\d+))[eE]?\d*$/
let number8 = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
let number9 = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
let number10 = /^(-|\+)?((\d+\.?\d*)|(\.\d+))([eE](-|\+)?\d+)?$/;


// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
	"1.3e2", "1E-4", "1e+12"]) {
	if (!number10.test(str)) {
		console.log(`Failed to match '${str}'`);
	}
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
	".5.", "1f5", "."]) {
	if (number10.test(str)) {
		console.log(`Incorrectly accepted '${str}'`);
	}
}

console.log(/^(-|\+)?(\d+(\.\d*)?|\.\d+)([eE](-|\+)?\d+)?$/g.test('5.'))
console.log(typeof -1E4)
console.log('hi')