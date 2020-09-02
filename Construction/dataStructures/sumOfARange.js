function range(start, finish, optionalStep = 1) {
    let resultArray = []
    if (optionalStep > 0) {
        for (let current = start; current <= finish; current += optionalStep) {
            resultArray.push(current)
        }
    } else if (optionalStep < 0) {
        for (let current = start; current >= finish; current += optionalStep) {
            resultArray.push(current)
        }
    }
    if (resultArray.length == 0) console.log("You’ve probably mistaken. Please, check your input.")
    return resultArray
}

console.log(range(5, 2, -1))

function sum(array) {
    let result = 0;
    for (let number of array) {
        result += number;
    }
    return result;
}

console.log(sum(range(1, 10)))