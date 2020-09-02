let testObject = {
    value1: 1,
    value2: 2,
    value3: 3
};

console.log(Object.keys(testObject))
for (value of Object.keys(testObject)) console.log(value)
for (value of Object.keys(testObject)) console.log(testObject[value])
console.log(Object.keys(testObject)[0])
console.log(testObject[Object.keys(testObject)[0]])

function deepEqual(firstExpression, secondExpression) {
    if (firstExpression === secondExpression) return true
    // null is a object (for some reason)
    else if (typeof firstExpression === 'object' && firstExpression != null && typeof secondExpression === 'object' && secondExpression != null) {
        // Checking values of the first one will be enough (values of both expressions should be equal)
        for (value of Object.keys(firstExpression)) {
            if (typeof firstExpression[value] == 'object' && typeof secondExpression[value] == 'object') {
                // (Jon Urry resolution) We are not simply returning the deepEqual boolean expression because right now we are checking just the "both expressions are objects" case here 
                // After some checking i guess we can actually just return the boolean expression!
                return deepEqual(firstExpression[value], secondExpression[value])
            } else if (firstExpression[value] !== secondExpression[value]) return false
        }
        return true
    }
}

let testObject1 = {
    value1: 1,
    value2: 2,
    value3: 3
};

let testObject2 = {
    value1: 1,
    value2: 2,
    value3: 3
};

let list1 = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

let list2 = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

let testValue1 = Object.keys(testObject1)[0]
let testValue2 = testObject1[testValue1]
let testValue3 = testObject2[testValue1]

console.log(testValue1)
console.log(testValue2)
console.log(testValue3)
console.log(testValue2 === testValue3)
console.log('\n')

function arrayToList(array) {
    let resultList = {};
    for (element of array.reverse()) {
        resultList = {
            value: element,
            rest: resultList
        }
    }
    return resultList
}

console.log(deepEqual(testObject1, testObject2))
console.log('\n')
console.log(deepEqual(arrayToList([1, 2, 3]), arrayToList([1, 2, 3])))