function Promise_all(promises) {
	return new Promise((resolve, reject) => {
		let promiseArray = [];
		// Pending - количество оставшихся в исполнении Промисов
		let pending = promises.length;
		for (let i = 0; i < promises.length; i++) {
			// Запускаем каждый Промис
			promises[i].then(
				result => {
					// Помещаем результат выполнения каждого Промиса на правильное место (по индексу)
					promiseArray[i] = result;
					// После каждого выполнения Промиса количество оставшихся уменьшается на 1 
					pending -= 1;
					// Если Промисов в выполнении больше не осталось - возвращаем массив Промисов
					if (pending == 0) resolve(promiseArray);
					// Делая Кэч выполняем полный Реджект (оборачивающего Промиса) чтобы выполнение прекращалось полностью
				}).catch(reject);
		}
		// Если в изначально переданном массиве Промисов их собственно нет, то делаем Резалв пустого массива
		if (promises.length == 0) resolve(promiseArray);
	});
}

// Test code.
Promise_all([]).then(array => {
	console.log("This should be []:", array);
});
function soon(val) {
	return new Promise(resolve => {
		setTimeout(() => resolve(val), Math.random() * 500);
	});
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
	console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
	.then(array => {
		console.log("We should not get here");
	})
	.catch(error => {
		if (error != "X") {
			console.log("Unexpected failure:", error);
		}
	});