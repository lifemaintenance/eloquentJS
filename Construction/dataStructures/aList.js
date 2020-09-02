let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

let anotherList = {
    value: 0,
    rest: list
};

let oneMoreList = {
    value: -1,
    rest: list
}

// console.log(anotherList.rest)
// console.log('\n')
// console.log(oneMoreList.rest)

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

function listToArray(list) {
    let resultArray = [];
    for (let listElement = list; listElement; listElement = listElement.rest) {
        if ("value" in listElement) resultArray.push(listElement.value);
    }
    return resultArray
}

function prepend(element, list) {
    resultList = {
        value: element,
        rest: list
    };
    return resultList
}

function nth(list, index) {
    current = 0;
    for (let listElement = list; listElement; listElement = listElement.rest) {
        if (current == index) return listElement
        if (current < index && listElement.rest == undefined) return undefined
        current++;
    }
}



function recursiveNth(list, index) {
    if (index == 0) return list
    else if (list.rest == undefined) return undefined
    else return recursiveNth(list.rest, index - 1)
}

console.log(list)
console.log(arrayToList([1, 2, 3]))
console.log(listToArray(arrayToList([1, 2, 3])))
console.log(prepend(0, arrayToList([1, 2, 3])))
console.log(nth(arrayToList([1, 2, 3]), 1))
console.log(recursiveNth(arrayToList([1, 2, 3]), 0))
console.log('finish')