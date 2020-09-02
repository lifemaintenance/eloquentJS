function reverseArray(array) {
    let newArray = JSON.parse(JSON.stringify(array));
    return newArray.reverse()
}

function reverseArrayInPlace(array) {
    let tempArray = []
    for (let i = array.length; i > 0; i--) {
        let elementTeleport = array.pop();
        tempArray.push(elementTeleport);
    }
    array = tempArray;
    return array
}

let shoppingList = ['1. Cucumbers', '2. Tomatoes', '3. Peppers']

console.log(reverseArray(shoppingList))
console.log(shoppingList)

let testArray = [1, 2, 3];

console.log(reverseArrayInPlace(testArray))



