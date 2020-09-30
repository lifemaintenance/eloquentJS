let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

console.log(Math.PI)

let angle = 0;
let lastTime = null;
let pi = Math.PI

function animate(time) {
	if (lastTime != null) angle += (time - lastTime) * 0.001;
	lastTime = time;
	cat.style.top = (Math.sin(angle) * 40 + 40) + 200 + "px";
	cat.style.left = (Math.cos(angle) * 200 + 230) + 200 + "px";
	hat.style.top = (Math.sin(angle) * 40 + 40) + 200 - 70 + "px";
	hat.style.left = (Math.cos(angle) * 200 + 230) + 200 + "px";

	// Your extensions here.

	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);