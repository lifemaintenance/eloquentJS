function asTabs(node) {
	for (let tab of Array.from(node.children)) {
		tab.style.display = 'none'
	}
	let tabInterface = document.createElement('div')
	let helpField = document.createElement('div')
	for (let tab of Array.from(node.children)) {
		let button = document.createElement('button')
		button.textContent = tab.getAttribute('data-tabname')
		button.dataset.textInfo = tab.textContent
		tabInterface.appendChild(button)
	}
	node.appendChild(helpField)
	tabInterface.addEventListener('click', event => {
		helpField.textContent = event.target.dataset.textInfo
		for (let button of Array.from(tabInterface.children)) {
			button.style.color = 'black'
		}
		event.target.style.color = 'red'
	})
	node.prepend(tabInterface)
}
asTabs(document.querySelector("tab-panel"));