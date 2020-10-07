let balloon = document.getElementById('balloon')
let size;
function setSize(newSize) {
	size = newSize
	balloon.style.fontSize = size + 'px'
}
setSize(50)

function changeSize(event) {
	event.preventDefault()
	if (event.key == 'ArrowUp') {
		setSize(size * 1.1)
		if (size > 200) {
			balloon.textContent = '💥'
			document.body.removeEventListener('keydown', changeSize)
		}
	} else if (event.key == 'ArrowDown') setSize(size / 1.1)
}
document.body.addEventListener('keydown', changeSize)