function haveString(node, string) {
	if (node.nodeType == Node.ELEMENT_NODE) { // An Element node like <p> or <div>.
		for (let child of node.childNodes) {
			if (haveString(child, string)) return true
		}
		return false
	} else if (node.nodeType == Node.TEXT_NODE) return node.nodeValue.indexOf(string) > -1 // The actual Text inside an Element or Attr.
}

console.log(haveString(document.body, 'Home'))

let link = document.body.getElementsByTagName('a')[0]
console.log(link.href)

function replaceImages() {
	let images = Array.from(document.body.getElementsByTagName('img'))
	for (let image of images) {
		if (image.alt) image.parentNode.replaceChild(document.createTextNode(image.alt), image)
	}
}

let button = document.getElementById('imgToText').addEventListener('click', replaceImages, false)

function elt(type, ...children) {
	let node = document.createElement(type)
	for (let child of children) {
		if (typeof child != 'string') node.appendChild(child)
		else node.appendChild(document.createTextNode(child))
	}
	return node
}

document.getElementById("quote").appendChild(
	elt("footer", "—",
		elt("strong", "Karl Popper"),
		", preface to the second edition of ",
		elt("em", "The Open Society and Its Enemies"),
		", 1950")
);

function time(name, action) {
	let start = Date.now()
	action()
	console.log(name, 'took', Date.now() - start, 'ms')
}


// time("dumdum", () => {
// 	let target = document.getElementById("one");
// 	while (target.offsetWidth < 2000) {
// 		target.appendChild(document.createTextNode("X"));
// 	}
// });

time('clever', () => {
	let line = document.getElementById('two')
	line.appendChild(document.createTextNode('X'))
	let limit = Math.ceil(2000 / (line.offsetWidth)) - 1
	line.firstChild.nodeValue = 'X'.repeat(limit)
})

let para = document.getElementById('para')
console.log('ooooh,', para.style.color)
para.style.color = 'blue'
console.log('(' + para.style.color + ')')

let paras = document.querySelectorAll('p')
console.log(paras[paras.length - 1])

