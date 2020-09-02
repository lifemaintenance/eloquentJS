const roads = [
	"Alice's House-Bob's House", "Alice's House-Cabin",
	"Alice's House-Post Office", "Bob's House-Town Hall",
	"Daria's House-Ernie's House", "Daria's House-Town Hall",
	"Ernie's House-Grete's House", "Grete's House-Farm",
	"Grete's House-Shop", "Marketplace-Farm",
	"Marketplace-Post Office", "Marketplace-Shop",
	"Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(roads) {
	let graph = Object.create(null);
	function addEdge(from, to) {
		if (graph[from] == null) graph[from] = [to]
		else graph[from].push(to)
	}
	for (let road of roads.map(road => road.split("-"))) {
		addEdge(road[0], road[1]);
		addEdge(road[1], road[0]);
	}
	return graph
}

let graph = buildGraph(roads)
console.log(graph)

class VillageState {
	constructor(place, parcels) {
		this.place = place;
		this.parcels = parcels;
	}

	move(destination) {
		if (!graph[this.place].includes(destination)) return this
		else {
			let parcels = this.parcels.map(parcel => {
				if (parcel.place != this.place) return parcel;
				return { place: destination, address: parcel.address };
			}).filter(parcel => parcel.place != parcel.address);
			return new VillageState(destination, parcels)
		}
	}
}


let start = new VillageState("Alice's House", [{ place: "Bob's House", address: "Town Hall" }])
console.log(start)
let firstMove = start.move("Bob's House")
console.log(firstMove)
let secondMove = firstMove.move("Town Hall")
console.log(secondMove)


function runRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			console.log(`Robot made it in ${turn} turns.`);
			return turn;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Robot moved to ${action.direction}.`)
	}
}

function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}

function randomRobot(state) {
	return { direction: randomPick(graph[state.place]) }
}

VillageState.random = function (parcelCount = 5) {
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		let parcelPlace = randomPick(Object.keys(graph));
		let parcelAddress = randomPick(Object.keys(graph));
		while (parcelAddress == parcelPlace) parcelAddress = randomPick(Object.keys(graph));
		parcels.push({ place: parcelPlace, address: parcelAddress })
	}
	return new VillageState('Post Office', parcels)
}

runRobot(VillageState.random(), randomRobot)
console.log('\n')

const mailRoute = [
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
];

function routeRobot(state, memory) {
	if (memory.length == 0) memory = mailRoute;
	return { direction: memory[0], memory: memory.slice(1) };
}

runRobot(VillageState.random(), routeRobot, [])
console.log('\n')

function findRoute(graph, from, to) {
	let work = [{ at: from, route: [] }];
	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i];
		for (place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some(w => w.at == place)) work.push({ at: place, route: route.concat(place) })
		}
	}
}

function smartRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) route = findRoute(graph, place, parcel.place);
		else route = findRoute(graph, place, parcel.address);
	}
	return { direction: route[0], memory: route.slice(1) };
}

runRobot(VillageState.random(), smartRobot, [])
console.log('\n')

// Task 1 

function compareTheRobots(robot1, memory1, robot2, memory2) {
	let amountOfTurns1 = 0;
	let amountOfTurns2 = 0;
	for (let i = 0; i < 100; i++) {
		let task = VillageState.random()
		amountOfTurns1 += runRobot(task, robot1, memory1);
		amountOfTurns2 += runRobot(task, robot2, memory2);
	}
	console.log(`First robot: avg. amount of SPT: ${amountOfTurns1 / 100}`);
	console.log(`Second robot: avg. amount of SPT: ${amountOfTurns2 / 100}`);
}

compareTheRobots(smartRobot, [], routeRobot, []);

// Task 2

function myRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcelArr = [];
		for (let parcel of parcels.filter(parcel => parcel.place != place)) {
			parcelArr.push(findRoute(graph, place, parcel.place).length)
		}

		if (parcelArr.length == 0) {
			for (let parcel of parcels) {
				parcelArr.push(findRoute(graph, place, parcel.place).length)
			}
		}

		let parcel = parcels[parcelArr.findIndex(element => element == Math.max(...parcelArr))]
		if (parcel.place != place) route = findRoute(graph, place, parcel.place);
		else route = findRoute(graph, place, parcel.address);

	}
	return { direction: route[0], memory: route.slice(1) };
}

compareTheRobots(myRobot, [], smartRobot, []);

// Task 3 

class PGroup {
	constructor(data) {
		this.data = data
	}

	add(value) {
		if (this.has(value)) return this;
		return new PGroup(this.data.concat(value))
	}

	delete(value) {
		if (!this.has(value)) return this;
		return new PGroup(this.data.filter(element => element != value))
	}

	has(value) {
		return this.data.includes(value)
	}

}

PGroup.empty = new PGroup([])

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false

