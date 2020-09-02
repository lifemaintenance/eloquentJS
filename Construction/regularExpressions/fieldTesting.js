let firstReg = new RegExp('abc');
let secondReg = /abc/;

console.log(firstReg.test('abcde'))
console.log(secondReg.test('abcde'))
console.log(firstReg.test('eabce'))

// If at least one of the characters in the Exp matches with the content of the test -> true
console.log(/[1,2,3,4,5,6,7,8,9,0]/.test('Hello 2000!'))
// Unicode Range
console.log(/[0-9]/.test('2020VISION'))
// \d - all digits
console.log(/\d/.test('Any numbers? 8)'))

// \d	Any digit character
// \w	An alphanumeric character (“word character”)
// \s	Any whitespace character (space, tab, newline, and similar)
// \D	A character that is not a digit
// \W	A nonalphanumeric character
// \S	A nonwhitespace character
// .	Any character except for newline

let time = /\d\d.\d\d.\d\d\d\d \d\d:\d\d/
console.log(`Time Test: ${time.test('28.03.2000 00:00')}`)
console.log(`Time Test: ${time.test('28.march.2000 00:00')}`)

// Are there any characters EXCEPT ones after ^ 
let nonBinary = /[^01]/;
console.log(`^Test: ${nonBinary.test('100111111010101010')}`)
console.log(`^Test: ${nonBinary.test('1001111110210101010')}`)

// {5,} - means five OR MORE times
let vagueTime = /\d{1,2}.\d{1,2}.\d{4} \d{1,2}:\d{2}/
console.log(`Time test: ${vagueTime.test('28.3.2000 0:00')}`)

// If you need to use more than one operator with one element - use parentheses
let laugh = /mua+(ha+)+/i; // i at the end makes it CASE INSENSETIVE
console.log(`Laugh test: ${laugh.test('Muaaaaaahahahahaaaaaaaaa')}`)

// .exec()
let match = /\d+/.exec('One Two 3')
console.log(match)
console.log(match.index)
// .match()
console.log('One Two 3'.match(/\d+/))

console.log(/bad(ly)?/.exec('bad'))

// Months start at 0!!! (so January is 0) Days start at 1.
console.log(new Date(2000, 2, 28))
console.log(new Date(2000, 2, 28).getTime())
console.log(new Date(954172800000))
// Current milliseconds
console.log(Date.now())

function getDate(string) {
	let [_, month, day, year] =
		/(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
	console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string))
	return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
//
console.log(getDate("100-1-30000"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)


function getPersonInfo(string) {
	let [_, name, surname, day, month, year] = /(\D{1,}) (\D{1,}) (\d{1,2}).(\d{1,2}).(\d{4})/.exec(string);
	return { name, surname, month, day, year }
}

console.log(getPersonInfo('Esmantovich Ivan 28.03.2000'))

function getDate(string) {
	let someObj = /^(\d{1,3})-(\d{1,2})-(\d{4})/.exec(string);
	let [_, month, day, year] = someObj;
	console.log(someObj, year, month - 1, day);
	return new Date(year, month - 1, day);
}
console.log(getDate("100-20-1203"));
console.log(getDate("2-20-1203"));

// If we want to enforce that the match must span the whole string, 
// we can add the markers ^ and $. The caret matches the start of 
// the input string, whereas the dollar sign matches the end. 
// So, /^\d+$/ matches a string consisting entirely of one or more digits, 
// /^!/ matches any string that starts with an exclamation mark, and 
// /x^/ does not match any string (there cannot be an x before the start of the string).

// \b - start or end of the word
console.log(/\bconcatenate\b/.test('concatenate'))
console.log(/\bconcatenate\b/.test('concatenatenation'))
console.log(/\bconcatenate\b/.test('concatenate-nation'))


// parentheses can be used to limit the part of the pattern that pipe operator applies to
console.log('\n')
let animals = /\b\d+ (chicken|pig|cow)s?\b/;
console.log(animals.test('15 chickens'))

// The matcher stops as soon as it finds a full match.
// This means that if multiple branches could potentially match a string,
// only the first one (ordered by where the branches appear
// in the regular expression) is used.

console.log('\n')
console.log('papa'.replace('p', 'm'))
console.log('papa'.replace(/p/g, 'm'))
console.log('borobudur'.replace(/[ou]/, 'a'))
console.log('borobudur'.replace(/[ou]/g, 'a'))


// The $1 and $2 in the replacement string refer to the parenthesized groups
// in the pattern. $1 is replaced by the text that matched against the first group,
// $2 by the second, and so on, up to $9. The whole match can be referred to with $&.
console.log(
	"Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
		.replace(/(\w+), (\w+)/g, "$2 $1"));

console.log('cia and fbi'.replace(/\b(cia|fbi)\b/g, str => str.toUpperCase()));

let stock = '100 gecs, 1000 gecs, and 2 gecs';
function regExpMinusOne(match, amount, unit) {
	amount = Number(amount) - 1;
	if (amount == 1) unit = unit.slice(0, unit.length - 1);
	else if (amount == 0) amount = 'no';
	return amount + ' ' + unit;
}

// Accepts first parentheses 
console.log(stock.replace(/(\d+) (\w+)/g, regExpMinusOne))

// [^] (any character that is not in the empty set of characters) 
// as a way to match any character
// (period character does not match newline characters)
function stripComments(code) {
	return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;

// Greedy version
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1

function fixedStripComments(code) {
	return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

// Non-Greedy
console.log(fixedStripComments("1 /* a */+/* b */ 1"));

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.

let edgyName = "dea+hl[]rd";
let anotherText = "This dea+hl[]rd guy is super annoying.";
let escaped = edgyName.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let anotherRegExp = new RegExp("\\b" + escaped + "\\b", "gi");
console.log(text.replace(regexp, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.

let pattern = /y/g;
pattern.lastIndex = 3;
let anotherMatch = pattern.exec("xyzzy");
console.log(anotherMatch.index);
// → 4
console.log(pattern.lastIndex);
// → 5

// lastIndex property updates every time after the 
// use of saved regular expression (CAN CAUSE BUGS AND ERRORS LIKE THESE)
let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// → ["1"]
console.log(digit.exec("and now: 1"));
// → null

console.log('banana'.match(/an/))
console.log('banana'.match(/an/g))

// Looping over matches
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b\d+\b/g;
let matchh;
while (matchh = number.exec(input)) {
	console.log(matchh)
	console.log("Found", matchh[0], "at", matchh.index);
}
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40


// If we want to enforce that the match must span the whole string,
// we can add the markers ^ and $. 
// The caret matches the start of the input string, 
// whereas the dollar sign matches the end. 
// So, /^\d+$/ matches a string consisting entirely of one or more digits,
// /^!/ matches any string that starts with an exclamation mark, 
// and /x^/ does not match any string (there cannot be an x before the start of the string).

function parseINI(string) {
	// Start with an object to hold the top-level fields
	let result = {};
	let section = result;
	string.split(/\r?\n/).forEach(line => {
		let match;
		if (match = line.match(/^(\w+)=(.*)$/)) {
			section[match[1]] = match[2];
		} else if (match = line.match(/^\[(.*)\]$/)) {
			// When it is a section header, 
			// a new section object is created, 
			// and section is set to point at it.
			section = result[match[1]] = {};
		} else if (!/^\s*(;.*)?$/.test(line)) {
			throw new Error("Line '" + line + "' is not valid.");
		}
	});
	return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

console.log(/🍎{3}/.test("🍎🍎🍎"));
// → false
console.log(/<.>/.test("<🌹>"));
// → false

// You must add a u (for Unicode) to be able to normally use Unicode characters
console.log(/<.>/u.test("<🌹>"));
// → true

// it is possible to use \p in a regular expression
// (that must have the Unicode option enabled) 
// to match all characters to which the Unicode 
// standard assigns a given property.
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false


// /abc/	A sequence of characters
// /[abc]/	Any character from a set of characters
// /[^abc]/	Any character not in a set of characters
// /[0-9]/	Any character in a range of characters
// /x+/	One or more occurrences of the pattern x
// /x+?/	One or more occurrences, nongreedy
// /x*/	Zero or more occurrences
// /x?/	Zero or one occurrence
// /x{2,4}/	Two to four occurrences
// /(abc)/	A group
// /a|b|c/	Any one of several patterns
// /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
// /\s/	Any whitespace character
// /\p/ Unicode (kind of)
// /./	Any character except newlines
// /\b/	A word boundary
// /^/	Start of input
// /$/	End of input

// A regular expression has a method test to test whether a given string matches it. 
// It also has a method exec that, when a match is found, 
// returns an array containing all matched groups. 
// Such an array has an index property that indicates where the match started.

// Strings have a match method to match them against a regular expression 
// and a search method to search for one, returning only 
// the starting position of the match. 
// Their replace method can replace 
// matches of a pattern with a replacement string or function.

// Regular expressions can have options, 
// which are written after the closing slash. 
// The i option makes the match case insensitive. 
// The g option makes the expression global, 
// which, among other things, causes 
// the replace method to replace all instances 
// instead of just the first. The y option makes it sticky, 
// which means that it will not search ahead and 
// skip part of the string when looking for a match. 
// The u option turns on Unicode mode, 
// which fixes a number of problems 
// around the handling of characters that take up two code units.