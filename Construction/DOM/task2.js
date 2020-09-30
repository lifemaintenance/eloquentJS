function byTagName(node, tagName) {
	let resultArray = []
	let children = node.childNodes
	tagName = tagName.toUpperCase() // .nodeName возвращает имя нода в апперкейсе
	for (let i = 0; i < children.length; i++) {
		if (children[i].nodeName == tagName && children[i].nodeType == document.ELEMENT_NODE) resultArray.push(children[i])
		resultArray = resultArray.concat(byTagName(children[i], tagName))
	}
	return resultArray
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2
console.log('hi')