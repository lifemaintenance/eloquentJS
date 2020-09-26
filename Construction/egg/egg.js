function parseExpression(program) {
	program = skipSpace(program) // Пропускаем возможные пробелы 
	let match, expr
	if (match = /^"([^"]*)"/.exec(program)) { // Строка
		expr = { type: 'value', value: match[1] }
	} else if (match = /^\d+\b/.exec(program)) { // Цифра
		expr = { type: 'value', value: Number(match[0]) }
	} else if (match = /^[^\s(),#"]+/.exec(program)) {
		expr = { type: 'word', name: match[0] } // Слово (переменная?)
	} else throw new SyntaxError('Wrong Syntax:' + program) // Если ничего из этого, то выдаем ошибку о невозможности распознать синтаксис

	return parseApply(expr, program.slice(match[0].length)) // В конце анализа выражения всегда проверяем является ли оно приложением.
	// Передаем какое либо совпавшее выражение и продолжение программы
}

function skipSpace(string) {
	let toCut = /^(#.*|\s)*/.exec(string)
	return string.slice(toCut[0].length)
}

function parseApply(expr, program) {
	program = skipSpace(program) // Пропускаем возможные пробелы
	if (program[0] != '(') return { expr: expr, rest: program } //Если сразу после переданного выражения не открываются скобки, то оно не является приложением. 
	// Возвращаем исходное выражение и оставшуюся программу 

	program = skipSpace(program.slice(1)) // Если код дошёл до этой точки, значит мы имеем дело с приложением. Пропускаем скобку (Слайс) и возможные пробелы
	expr = { type: 'apply', operator: expr, args: [] } // Возвратное Выражение является приложением. 
	// Параметр оператора - это то, как это приложение вызывается (после чего открываются скобки)
	// Пустой массив для аргументов, которые сейчас будут добавляться
	while (program[0] != ')') { // Продолжаем, пока не дойдем до закрывающей скобки
		let arg = parseExpression(program) // Запускаем ПарсЭкспрешн на встреченный аргумент
		expr.args.push(arg.expr) // Арг прошёл и проверку на выражение и проверку на приложение. 
		// Если Арг является приложением, то у него в свою очередь запускается обработка его аргументов. 
		// Когда у него закончится обработка ЕГО аргументов, то он будет передан в ПарсЭплай (внизу) 
		// и если после закрытия скобки у него не откроется еще одна (приложение возвращающее приложение) он будет возвращен в стандартном виде и у него будет параметр expr.
		program = skipSpace(arg.rest) // Пропускаем пробелы в оставшейся после обработки выражения программе
		if (program[0] == ',') program = skipSpace(program.slice(1)) // Встречая запятую, пропускаем её и возможные пробелы
		else if (program[0] != ')') throw new SyntaxError(') or , were expected.' + program) // Если после обработки выражения нам не встретилась запятая, то нам должна встретиться скобка.
		// Если этого не происходит, то выдаем ошибку.
	}

	return parseApply(expr, program.slice(1)); // Пропускаем закрывающую скобку и запускаем ПарсЭплай по новой передавая ему имеющееся выражение с его аргументами
	// Если встретим открывающую скобку, то круг запустится снова
}

function parse(program) {
	let { expr, rest } = parseExpression(program)
	if (rest.length > 0) throw new SyntaxError('Unexpected text after end of the program.' + rest)
	return expr
}

console.log(parse('+(a, 10)'))

const specialForms = Object.create(null)

function evaluate(expr, scope) {
	if (expr.type == 'value') return expr.value // Если перед нами значение - возвращаем его ...значение
	else if (expr.type == 'word') { // Если перед нами привязка - смотрим, находится ли она в текущей области видимости. 
		if (expr.name in scope) return scope[expr.name] // Если да, то возвращаем ее значение по индексу.
		else throw new ReferenceError('Undefined Binding.')
	} else if (expr.type == 'apply') {
		let { operator, args } = expr // Если перед нами приложение - создаем обьект сохраняя в него оператор нашего приложения и все его аргументы
		if (operator.type == 'word' && operator.name in specialForms) return specialForms[operator.name](expr.args, scope) // Если это особое приложение, такое как if, то
		// вызываем его по индексу и передаем ему свои аргументы и текущую область видимости
		else { // Если код дошёл до этого, то перед нами обычный вызов
			let op = evaluate(operator, scope) // Вызываем Эвальюэйт по новой и получаем его значение либо напрямую, либо по индексу из области видимости
			if (typeof op == 'function') return op(...args.map(arg => evaluate(arg, scope))) // Проверяем, является ли полученное значение JS-Функцией, если да, то 
			// возвращаем как обычную JS-Функцию, передав ей предварительно выполненные аргументы
			else throw new TypeError('Trying to evaluate Invalid Function.')
		}
	}
}

specialForms.if = (args, scope) => { // Мы определяем if как специальную форму потому что в функциях все аргументы выполняются до ее непосредственного вызова, а
	// от if'а необходимо выполнить только ОДИН ИЗ аргументов
	if (args.length != 3) throw new SyntaxError('Incorrect amount of IF Arguments.')
	else if (evaluate(args[0], scope) !== false) return evaluate(args[1], scope)
	else return evaluate(args[2], scope)
}

specialForms.while = (args, scope) => {
	if (args.length != 2) throw new SyntaxError('Incorrect amount of WHILE Arguments')
	while (evaluate(args[0], scope) !== false) evaluate(args[1], scope)
	return false // Возвращаем false, так как у нас нет своего варианта Undefined
}

specialForms.do = (args, scope) => {
	let value = false
	for (let arg of args) value = evaluate(arg, scope) // Выполняем все выражения от начала до конца
	return value // Возвращаемым значением является значение последнего выражения
}

specialForms.define = (args, scope) => {
	if (args.length != 2 && args[0].type != 'word') throw new SyntaxError('Wrong DEFINE input.')
	let value = evaluate(args[1], scope) // Выполняем второй из переданных аргументов
	scope[args[0].name] = value // В качестве имени первого аргумента присваиваем результат выполнения
	return value // Возвращаем результат выполнения
}

const topScope = Object.create(null)

topScope.true = true
topScope.false = false

let prog = parse(`if(true, false, true)`)
console.log(evaluate(prog, topScope))

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
	topScope[op] = Function('a, b', `return a ${op} b;`)
}

topScope.print = value => {
	console.log(value)
	return value
}

function run(program) {
	return evaluate(parse(program), Object.create(topScope))
}

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`);

specialForms.fun = (args, scope) => {
	if (!args.length) throw new SyntaxError('Function needs a Body.')
	let body = args[args.length - 1] // Тело функции передаётся последним из аргументов
	let params = args.slice(0, args.length - 1).map(expr => { // Уменьшаем на один элемент то, что теперь принимаем за параметры нашей функции
		// Проверяем каждый имеющийся параметр на единственное условие - он должен быть словом - переменной
		if (expr.type != 'word') throw new SyntaxError('Parameters names must be words')
		// В качестве каждого параметра устанавливаем его имя/название
		return expr.name
	})

	return function () {
		if (arguments.length != params.length) throw new SyntaxError('Wrong amount of arguments.')
		let localScope = Object.create(scope)
		for (let i = 0; i < arguments.length; i++) localScope[params[i]] = arguments[i]
		return evaluate(body, localScope)
	}
}

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);

// --- First Task ---

topScope.array = (...args) => {
	let resultArray = []
	for (let arg of args) resultArray.push(arg)
	return resultArray
}

topScope.length = (array) => {
	let result = 0;
	for (let element of array) result++
	return result
}

topScope.element = (array, n) => {
	return array[n]
}

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6

// --- Second Task ---

// The following program illustrates this: function f returns a function that adds its argument to 
// f’s argument, meaning that it needs access to the local scope inside f to be able to use binding a.

// run(`
// do(define(f, fun(a, fun(b, +(a, b)))),
//    print(f(4)(5)))
// `);
// // → 9
// Go back to the definition of the fun form and explain which mechanism causes this to work.

// Область видимости возвращаемой функции создается по прототипу области видимости в которой она определялась

// --- Third Task ---

console.log(parse("# hello\nx"))
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"))
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}

// --- Fourth Task ---

specialForms.set = (args, scope) => {
	if (args.length != 2 && args[0].type != 'word') throw new SyntaxError('Wrong DEFINE input.')
	let value = evaluate(args[1], scope)
	// Идем вверх и если находим обьявленную переменную, то обновляем ее значение.
	for (let prototype = scope; prototype; prototype = Object.getPrototypeOf(prototype)) {
		prototype = Object.getPrototypeOf(prototype)
		if (Object.prototype.hasOwnProperty.call(prototype, args[0].name) == true) {
			prototype[args[0].name] = value
			return value
		}
	}
	throw new ReferenceError('There is no such variable in the outer scope.')
}

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError