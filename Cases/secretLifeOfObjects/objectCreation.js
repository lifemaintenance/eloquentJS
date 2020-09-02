// Pre ES-6 object creation

function OrganizationMember(number) {
	this.number = number
}

OrganizationMember.prototype.greeting = function () {
	console.log(`I'am the ${this.number}'th member of the organization, ${this.number === 13 ? 'Roxas' : 'NoName'}!`)
}

let someMember = new OrganizationMember(1)
let rucksack = new OrganizationMember(13)

someMember.greeting()
rucksack.greeting()

// Current Version

console.log('\n')

class GuardianOfLight {
	constructor(number, role) {
		this.number = number;
		this.role = role;
	}
	greeting() {
		console.log(`Hi! I am The ${this.number}'nd part of the Guardians: ${this.role}!`)
	}
}

let donald = new GuardianOfLight(2, 'Magician')
donald.greeting()

// Another Way

console.log('\n')

let undefinedVegetable = new class { lookAt() { console.log(`It's a vegetable, ${this.name}.`) } }
undefinedVegetable.lookAt()

// Rewriting

class Guy {
	constructor(gender, heigth, weigth) {
		this.gender = gender;
		this.heigth = heigth;
		this.weigth = weigth;
	}
}

let someGuy1 = new Guy('male', 'decent', 'medium');
let someGuy2 = new Guy('male', 'very tall', 'small');
let someGuy3 = new Guy('male', 'decent', 'medium');

Guy.prototype.physique = 'average';
someGuy2.physique = 'very good';

console.log(someGuy1.physique)
console.log(someGuy2.physique)
console.log(someGuy3.physique)

// Completely empty object

let emptyBook = Object.create(null);

emptyBook.firstPage = 'You are reading The Empty Book.';
emptyBook.secondPage = 'What do you think?'
emptyBook.thirdPage = `There is no toString in this book. See for Yourself: "Is there a toString in this book?", Answer: "${"toString" in emptyBook}" Great.`
emptyBook.fourthPage = 'Do you like it?'

console.log(emptyBook, emptyBook.thirdPage)
console.log('\n')

// Or...

let mapBook = new Map();
mapBook.set('firstPage', 'Your are reading The Map Book.')
mapBook.set('secondPage', 'MapBook... Get it?')
mapBook.set('thirdPage', `There is also no toString in here. You should check it through someMap.has(key) (Check: ${mapBook.has('toString')}) Cool. `)
mapBook.set('fourthPage', 'I see that you like it.')

console.log(mapBook, mapBook.get('thirdPage'))

// Gimmick

let badIdea = { 'one': 1, 'two': 2, 'three': 3 }

console.log(badIdea.hasOwnProperty('one'), badIdea.hasOwnProperty('toString'))

