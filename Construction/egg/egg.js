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
	let space = string.search(/\S/)
	if (space == -1) return ''
	return string.slice(space) // Возвращаем продолжение программы без пробелов в начале
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

