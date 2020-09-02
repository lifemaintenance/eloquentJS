const box = {
	locked: true,
	unlock() { this.locked = false; },
	lock() { this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error("Locked!");
		return this._content;
	}
};

// function withBoxUnlocked(body) {
// 	if (box.locked) {
// 		box.unlock();
// 		try {
// 			body()
// 		} catch (e) {
// 			throw e
// 		} finally {
// 			box.lock();
// 		}
// 	} else {
// 		try {
// 			body()
// 		} catch (e) {
// 			throw e
// 		}
// 	}
// }


// Shorter version
function withBoxUnlocked(body) {
	let boxWasLocked = false;
	if (box.locked) {
		boxWasLocked = true;
		box.unlock();
	}
	try {
		body()
	} catch (e) {
		throw e
	} finally {
		if (boxWasLocked) box.lock();
	}
}

withBoxUnlocked(function () {
	box.content.push("gold piece");
});

withBoxUnlocked(function () {
	console.log(box.content)
})

try {
	withBoxUnlocked(function () {
		throw new Error("Pirates on the horizon! Abort!");
	});
} catch (e) {
	console.log("Error raised: " + e);
}
console.log(box.locked);
  // → true