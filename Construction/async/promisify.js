function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;

	script.onload = () => callback(null, script);
	script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

	document.head.append(script);
}

// использование:
// loadScript('path/script.js', (err, script) => {...})

function loadScriptPromise(src) {
	return new Promise((resolve, reject) => {
		loadScript(src, (error, script) => {
			if (error) reject(error);
			else resolve(script);
		});
	})
}

function promisify(f) {
	return function (...args) { // возвращает функцию-обёртку
		return new Promise((resolve, reject) => {
			function callback(err, result) { // наш специальный колбэк для f
				if (err) return reject(err)
				else resolve(result)
			}

			args.push(callback); // добавляем колбэк в конец аргументов f

			f.call(this, ...args); // вызываем оригинальную функцию
		});
	};
};

// использование:
//   let loadScriptPromise = promisify(loadScript);
//   loadScriptPromise(...).then(...);

function pluralPromisify(f, manyArgs = false) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			function callback(err, ...results) {
				if (err) return reject(err)
				else resolve(manyArgs ? results : results[0])
			}

			args.push(callback)

			f.call(this, ...args)
		})
	}
}

// использование:
// f = promisify(f, true)
// f(...).then(arrayOfResults => {...}, err => {...})


