export function selectScript(source) {
	return new Promise(function (resolve, reject) {
		let script = document.createElement('script');
		script.src = source + '.js'
		script.onload = () => resolve(script.src);
		script.onerror = () => reject(new Error(`Invalid Source (${source})`));
		document.head.append(script)
	})
}



