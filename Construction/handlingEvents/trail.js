window.addEventListener('mousemove', event => {
	let shadow = document.createElement('div')
	shadow.className = 'trail'
	shadow.style.left = (event.pageX + 4) + 'px'
	shadow.style.top = (event.pageY + 4) + 'px'
	setTimeout(() => {
		shadow.remove()
	}, 100);
	document.body.appendChild(shadow)
})

// let shadows = []
// for (let i = 0; i < 12; i++) {
// 	let shadow = document.createElement('div')
// 	shadow.className = 'trail'
// 	shadows.push(shadow)
// 	document.body.appendChild(shadow)
// }
// let currentShadow = 0
// window.addEventListener('mousemove', event => {
// 	let shadow = shadows[currentShadow]
// 	shadow.style.left = (event.pageX + 4) + 'px'
// 	shadow.style.top = (event.pageY + 4) + 'px'
// 	currentShadow = (currentShadow + 1) % shadows.length
// })

