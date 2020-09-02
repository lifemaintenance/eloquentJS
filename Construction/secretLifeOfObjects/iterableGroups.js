class Group {
	constructor() {
		this.data = []
	}

	add(value) {
		if (this.data.indexOf(value) == -1) this.data.push(value)
	}

	delete(value) {
		let itemIndex = this.data.indexOf(value)
		if (itemIndex != -1) {
			let deletedItem = this.data.splice(itemIndex, 1)
		}
	}

	has(value) {
		return this.data.includes(value)
	}

	get(index) {
		return this.data[index]
	}

	static from(someObject) {
		let newGroup = new Group
		let isIterable = someObject => someObject != null && typeof someObject[Symbol.iterator] === 'function'
		if (isIterable) {
			for (let item of someObject) {
				newGroup.add(item)
			}
		}
		return newGroup
	}
}

class GroupIterator {
	constructor(group) {
		this.group = group
		this.itemIndex = 0;
	}

	next() {
		if (this.itemIndex == this.group.data.length) return { done: true };

		let value = {
			index: this.itemIndex,
			value: this.group.get(this.itemIndex)
		};

		this.itemIndex++;
		return { value, done: false };
	}
}

Group.prototype[Symbol.iterator] = function () {
	return new GroupIterator(this);
}

let testGroup = new Group
testGroup.add(1)
testGroup.add(2)
testGroup.add(3)
testGroup.add(4)
testGroup.add(5)
testGroup.delete(3)
console.log(testGroup)
console.log(testGroup.has(2))
console.log(testGroup.has(3))
let testCloneGroup = Group.from([1, 2, 2, 3])
console.log(testCloneGroup)

for (let item of testGroup) console.log(item)
