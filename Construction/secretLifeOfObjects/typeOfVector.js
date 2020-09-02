class Vec {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	plus(anotherVector) {
		let resultVec = new Vec
		resultVec.x = this.x + anotherVector.x
		resultVec.y = this.y + anotherVector.y
		return resultVec
	}

	minus(anotherVector) {
		let resultVec = new Vec
		resultVec.x = this.x - anotherVector.x
		resultVec.y = this.y - anotherVector.y
		return resultVec
	}

	get length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}
}

let firstTestVec = new Vec(5, 12)
let secondTestVec = new Vec(10, 0)
let thirdTestVec = firstTestVec.minus(secondTestVec)
console.log(thirdTestVec.length)