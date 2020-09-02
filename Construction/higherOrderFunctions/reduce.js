let arrayNeededToBeReduced = [[1], [1, 2], [1, 2, 3,], [1, 2, 3, 4], [1, 2, 3, 4, 5]];


let reducedArray = arrayNeededToBeReduced.reduce((newArray, arrayElement) => newArray.concat(arrayElement))
console.log(reducedArray)


