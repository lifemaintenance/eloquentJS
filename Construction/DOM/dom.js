function haveString(node, string) {
	if (node.nodeType == Node.ELEMENT_NODE) { // An Element node like <p> or <div>.
		for (let child of node.childNodes) {
			if (haveString(child, string)) return true
		}
		return false
	} else if (node.nodeType == Node.TEXT_NODE) return node.nodeValue.indexOf(string) > -1 // The actual Text inside an Element or Attr.
}

console.log(haveString(document.body, 'Home'))

let link = document.body.getElementsByTagName('a')[0]
console.log(link.href)

function replaceImages() {
	let images = Array.from(document.body.getElementsByTagName('img'))
	for (let image of images) {
		if (image.alt) image.parentNode.replaceChild(document.createTextNode(image.alt), image)
	}
}

let button = document.getElementById('imgToText').addEventListener('click', replaceImages, false)

function elt(type, ...children) {
	let node = document.createElement(type)
	for (let child of children) {
		if (typeof child != 'string') node.appendChild(child)
		else node.appendChild(document.createTextNode(child))
	}
	return node
}

document.getElementById("quote").appendChild(
	elt("footer", "—",
		elt("strong", "Karl Popper"),
		", preface to the second edition of ",
		elt("em", "The Open Society and Its Enemies"),
		", 1950")
);

function time(name, action) {
	let start = Date.now()
	action()
	console.log(name, 'took', Date.now() - start, 'ms')
}


// time("dumdum", () => {
// 	let target = document.getElementById("one");
// 	while (target.offsetWidth < 2000) {
// 		target.appendChild(document.createTextNode("X"));
// 	}
// });

time('clever', () => {
	let line = document.getElementById('two')
	line.appendChild(document.createTextNode('X'))
	let limit = Math.ceil(2000 / (line.offsetWidth)) - 1
	line.firstChild.nodeValue = 'X'.repeat(limit)
})

let para = document.getElementById('para')
console.log('ooooh,', para.style.color)
para.style.color = 'blue'
console.log('(' + para.style.color + ')')

let paras = document.querySelectorAll('p')
console.log(paras[paras.length - 1])

function makeWorker() {
	let name = 'Pete'

	return function () {
		console.log(name)
	}
}

let name = 'John'
let worker = makeWorker()
worker()

let phrase = 'hi'

if (true) {
	let hiName = 'mark'
	console.log(phrase, name)
}

// console.log(hiName) 
// ERROR dom.js:89 Uncaught ReferenceError: hiName is not defined

// цикл for особенный в плане окружений. i, хоть и находится вне фигурных скобок ({}), является частью окружения каждой итерации
for (let i = 0; i < 10; i++) {
	console.log(i)
}

// console.log(i)
//dom.js:96 Uncaught ReferenceError: i is not defined

// Можно использовать фигурные скобки для создания 'блоков кода' во избежания таких ошибок как, например, когда подключено одновременно несколько скриптов,
// (они разделяют общее пространство имён) и если в качестве имени переменной используется распространенное слово, а авторы этих скрипов разные и не знают друг о друге
// то имена переменных могут конфликтовать. 
{
	let message = 'hello there'
	console.log(message)
}

// console.log(message)
// Uncaught ReferenceError: message is not defined


// IIFE - Immediately invoked function expressions
// Использовались до того как в JS поддерживалось создание 'блоков кода' при помощи фигурных скобок для того чтобы изолироваться

(function () {
	let iifeName = 'mark'
	console.log(iifeName)
})()

// console.log(iifeName)
//dom.js:120 Uncaught ReferenceError: iifeName is not defined


function f() {
	let name1 = 'these names will be lost'
	let name2 = 'like tears in rain'
}

f()
// console.log(name1)
// console.log(name2)
// name1 и name2 стёрты так как удалено окружение в котором они были созданы. нет ни одной вложенной функции, окружение которой ссылалось бы 
// на окружение в котором продолжали бы существовать эти переменные 

function nextLevelF() {
	let importantName = '67'

	function g() {
		console.log(importantName)
	}
	return g
}

let takeCare = nextLevelF()
takeCare()
let niceArray = [nextLevelF(), nextLevelF(), nextLevelF()]
console.log(niceArray)
niceArray[0]()

takeCare = null
niceArray = null
// Как только исчезает последняя вложенная функция которая ссылается на окружение, оно перестает существовать.
// Память очищена.

// function f() {
// 	let value = Math.random();

// 	function g() {
// 	  debugger; // в консоли: напишите alert(value); Такой переменной нет!
// 	}

// 	return g;
//   }

//   let g = f();
//   g();

// let value = "Сюрприз!";

// function f() {
//   let value = "ближайшее значение";

//   function g() {
//     debugger; // в консоли: напишите alert(value); Сюрприз!
//   }

//   return g;
// }

// let g = f();
// g(); 

// Особенность V8 заключается в том как он оптимизирует память.
// Если по коду "видно", что внешняя переменная не используется, она становится недоступна.

function makeCounter() {
	let count = 0;

	return function () {
		return count++;
	};
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1

console.log(counter2()); // ?
console.log(counter2()); // ?

// Вывод будет: 0 1, так как переменные-функции созданы разными вызовами makeCounter
// У них независимые внешние лексические окружения, у каждой свой count

function Counter() {
	let count = 0;

	this.up = function () {
		return ++count;
	};
	this.down = function () {
		return --count;
	};
}

counter = new Counter();

console.log(counter.up()); // ?
console.log(counter.up()); // ?
console.log(counter.down()); // ?

// Вывод будет: 1 2 1, так как обе вложенные функции были созданы при помощи одного вызова, у них оно внешнее лексическое окружение и доступ к одной и той же переменной

phrase = "Hello";

if (true) {
	let user = "John";

	function sayHi() {
		console.log(`${phrase}, ${user}`);
	}
}

// sayHi();

// Результатом выполнения будет ошибка, так как функция определена внутри окружения if. Мы не можем вызвать её извне

// Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.

// Да, именно таким образом, используя двойные круглые скобки (не опечатка).

// Например:


function sum(firstNumber) {
	return function (secondNumber) {
		return firstNumber + secondNumber
	}
}

console.log(sum(1)(2)) //3
console.log(sum(5)(-1)) //4

// Чтобы вторые скобки заработали, первые должны вернуть функцию.
// Представляю, что на место выполненной функции встает return. В принципе, так оно и есть :)

/* .. ваш код для inBetween и inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(begin, end) {
	return function argumentHolder(x) {
		return x >= begin && x <= end
	}
}

function inArray(arr) {
	return function argumentHolder(x) {
		return arr.includes(x)
	}
}

console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

let users = [
	{ name: "John", age: 20, surname: "Johnson" },
	{ name: "Pete", age: 18, surname: "Peterson" },
	{ name: "Ann", age: 19, surname: "Hathaway" }
];


// по имени (Ann, John, Pete)
// users.sort((a, b) => a.name > b.name ? 1 : -1);


function byField(fieldName) {
	return function currentAndNextHolder(current, next) {
		return current[fieldName] > next[fieldName] ? 1 : -1
	}
}

// users.sort(byField('name'))

// по возрасту (Pete, Ann, John)
users.sort(byField('age'))

console.log(users)

function makeArmy() {
	let shooters = [];


	for (let i = 0; i < 10; i++) {
		let shooter = function () { // функция shooter
			console.log(i); // должна выводить порядковый номер
		};
		shooters.push(shooter);
	}

	return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
//   // ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...

function howManyTimes() {
	let times = 0

	return function () {
		console.log(++times)
	}
}

let plusOne = howManyTimes()

plusOne()
plusOne()
plusOne()