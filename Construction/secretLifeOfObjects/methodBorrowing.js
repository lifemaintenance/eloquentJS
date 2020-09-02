let someObject = { 'one': 1, 'two': 2, 'three': 3, hasOwnProperty: true }

console.log(Object.prototype.hasOwnProperty.call(someObject, 'one'))