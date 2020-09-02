let promise = new Promise(function (resolve, reject) {
	let progress = 0;
	let timerID = setInterval(() => {
		if (progress >= 19) resolve(timerID)
		console.log('loading...')
		progress++;
	}, 100);
})


promise.then(
	result => {
		clearInterval(result);
		console.log('done!')
	},
	error => console.log(error)
);
