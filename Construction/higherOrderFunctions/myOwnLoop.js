function loop(value, conditionFunction, incrementFunction, bodyFunction) {
    while (conditionFunction(value) === true) {
        bodyFunction(value)
        value = incrementFunction(value)
    }
};



loop(3, i => i < 10, i => i + 1, console.log)

let someArray = [];

loop(3, i => i < 10, i => i + 1, value => someArray.push(value))

console.log(someArray)