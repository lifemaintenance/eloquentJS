// Add dependencies and exports

require.cache = Object.create(null);

function require(name) {
	if (!(name in require.cache)) {
		let code = readFile(name);
		let module = { exports: {} };
		require.cache[name] = module;
		let wrapper = Function("require, exports, module", code);
		wrapper(require, module.exports, module);
	}
	return require.cache[name].exports;
}

const { buildGraph } = require('./graph')

const roads = [
	"Alice's House-Bob's House", "Alice's House-Cabin",
	"Alice's House-Post Office", "Bob's House-Town Hall",
	"Daria's House-Ernie's House", "Daria's House-Town Hall",
	"Ernie's House-Grete's House", "Grete's House-Farm",
	"Grete's House-Shop", "Marketplace-Farm",
	"Marketplace-Post Office", "Marketplace-Shop",
	"Marketplace-Town Hall", "Shop-Town Hall"
];

exports.roadGraph = buildGraph(roads.map(road => road.split('-')));