let balloon = document.getElementById('balloon')
let initialSize = '100%'
balloon.style.fontSize = initialSize

let transform = (data) => Number(data.slice(0, -1))
function changeSize(event) {
	event.preventDefault()
	if (event.key == 'ArrowUp') {
		let currentSize = transform(balloon.style.fontSize)
		balloon.style.fontSize = `${currentSize + currentSize * 0.1}%`
		if (transform(balloon.style.fontSize) > transform(initialSize) * 5) {
			balloon.textContent = '💥'
			document.body.removeEventListener('keydown', changeSize)
		}
	}
	else if (event.key == 'ArrowDown') {
		let currentSize = transform(balloon.style.fontSize)
		balloon.style.fontSize = `${currentSize - currentSize * 0.1}%`
	}
}
document.body.addEventListener('keydown', changeSize)