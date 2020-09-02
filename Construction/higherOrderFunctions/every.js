function everyLoopVersion(array, checkFunction) {
    for (element of array) {
        if (checkFunction(element) === false) return false
    }
    return true
}

let someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let secondArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(everyLoopVersion(someArray, element => element < 10))
console.log(everyLoopVersion(secondArray, element => element < 10))

function everySomeVersion(array, checkFunction) {
    if (array.some(element => !checkFunction(element)) === false) return true;
    else return false
}

console.log(everySomeVersion(someArray, element => element < 10))
console.log(everySomeVersion(secondArray, element => element < 10))
