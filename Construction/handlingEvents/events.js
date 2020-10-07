let button = document.getElementById('clickMe')

function firstKnock() {
	console.log('Who knocked?')
	button.removeEventListener('click', firstKnock)
	button.addEventListener('click', secondKnock)
}

function secondKnock() {
	console.log('I am the one WHO KNOCKES!')
	button.removeEventListener('click', secondKnock)
	button.addEventListener('click', firstKnock)
}

button.addEventListener('click', firstKnock)

let anyWayButton = document.getElementById('anyWay')

anyWayButton.addEventListener('mousedown', event => {
	if (event.button == 0) console.log('Left Button')
	else if (event.button == 1) console.log('Middle Button')
	else if (event.button == 2) console.log('Right Button')
})

let para = document.getElementById('para')
para.addEventListener('mousedown', event => {
	console.log('Paragraph clicked.')
})
let paraButton = document.getElementById('paraButton')
paraButton.addEventListener('mousedown', event => {
	console.log('Button clicked.')
	if (event.button == 1) event.stopPropagation()
})

let buttonSet = document.getElementById('buttonSet')

buttonSet.addEventListener('click', event => {
	if (event.target.nodeName == 'BUTTON') {
		console.log('Clicked', event.target.textContent)
	}
})

let someLink = document.getElementById('link')

someLink.addEventListener('click', event => {
	console.log('Nah.')
	event.preventDefault()
})

document.body.addEventListener('keydown', event => {
	if (event.key == 'b') document.body.style.background = '#B0F5FF'
})

document.body.addEventListener('keyup', event => {
	if (event.key == 'b') document.body.style.background = ''
})

document.body.addEventListener('keydown', event => {
	if ((event.key == 'c' || event.key == 'C') && event.metaKey) console.log('Text copied.')
})

let bar = document.getElementById('resizableBar')
let lastX

bar.addEventListener('mousedown', event => {
	if (event.button == 0) {
		lastX = event.clientX
		window.addEventListener('mousemove', moved)
		event.preventDefault()
	}

})

function moved(event) {
	if (event.buttons == 0) window.removeEventListener('mousemove', moved)
	else {
		let dist = event.clientX - lastX
		let newWidth = Math.max(10, bar.offsetWidth + dist)
		bar.style.width = newWidth + 'px'
		lastX = event.clientX
	}
}

let progressBar = document.getElementById('progress')
window.addEventListener('scroll', () => {
	let max = document.body.scrollHeight - innerHeight;
	progressBar.style.width = `${(pageYOffset / max) * 100}%`;
});

let help = document.getElementById('help')
let fields = document.querySelectorAll('input')
for (let field of Array.from(fields)) {
	field.addEventListener('focus', event => {
		let text = event.target.getAttribute('data-help')
		help.textContent = text
	})
	field.addEventListener('blur', event => {
		help.textContent = ''
	})
}

// Создаем нового Воркера из отдельного файла. Процессы связанные с ним будут происходить не в этом файле, а в отдельном потоке.
// postMessage() стреляет событие message в его получателе (через кого мы вызвали postMessage)
// В этом получателе мы обрабатываем данные этого события и возвращаем результат обратно таким же образом, через postMessage()
// Ловим ответный результат мы при помощи добавления eventListener'а на созданный нами Воркер в котором и происходит обработка
let squareWorker = new Worker('squareWorker.js')
squareWorker.addEventListener('message', event => {
	console.log('The Worker responded: ', event.data)
})

squareWorker.postMessage(10)
squareWorker.postMessage(24)

let ticks = 0
let clock = setInterval(() => {
	console.log('tick: ', ticks++)
	if (ticks > 20) {
		clearInterval(clock)
		console.log('stop')
	}
}, 100)

let timer
let textArea = document.getElementById('textArea')
textArea.addEventListener('input', () => {
	clearTimeout(timer)
	timer = setTimeout(() => console.log('Typed!'), 500)
})

let scheduled = null
window.addEventListener('mousemove', event => {
	if (!scheduled) {
		setTimeout(() => {
			console.log(`Mouse at ${scheduled.pageX}, ${scheduled.pageY}`)
			scheduled = null
		}, 200)
	}
	scheduled = event
})