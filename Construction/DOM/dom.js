function haveString(node, string) {
	if (node.nodeType == Node.ELEMENT_NODE) { // An Element node like <p> or <div>.
		for (let child of node.childNodes) {
			if (haveString(child, string)) return true
		}
		return false
	} else if (node.nodeType == Node.TEXT_NODE) return node.nodeValue.indexOf(string) > -1 // The actual Text inside an Element or Attr.
}

console.log(haveString(document.body, 'Home'))

