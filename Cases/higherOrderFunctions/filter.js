let programmers = [
    { name: 'Sam', experience: 'Senior', yearsOfExperience: 5 },
    { name: 'Max', experience: 'Junior', yearsOfExperience: 1.5 },
    { name: 'Alex', experience: 'Middle', yearsOfExperience: 3 },
    { name: 'Toby', experience: 'Middle', yearsOfExperience: 3 },
    { name: 'Xenanort', experience: 'Senior', yearsOfExperience: 67 },
]

function filter(array, test) {
    filtered = [];
    for (element of array) if (test(element)) filtered.push(element);
    return filtered
}

seniors = (filter(programmers, programmer => programmer.experience === 'Senior'))

console.log(seniors)

// function map(array, transformation) {
//     transformed = [];
//     for (element of array) transformed.push(transformation(element));
//     return transformed
// }

// let namesOfProgrammers = (map(programmers, programmer => programmer['name']))

// console.log(namesOfProgrammers)

function reduce(array, combine, start) {
    let current = start;
    for (element of array) {
        current = combine(current, element)
    }
    return current
}
// let allYears = reduce(programmers, (curr, programmer) => curr + programmer['yearsOfExperience'], 0)
let allYears = programmers.reduce((curr, programmer) => curr + programmer['yearsOfExperience'], 0)

console.log(allYears)

let namesOfProgrammers = programmers.map(programmer => programmer['name'])

console.log(namesOfProgrammers)

let mostYears = programmers.reduce((topYears, someYears) => topYears.yearsOfExperience < someYears.yearsOfExperience ? someYears.yearsOfExperience : topYears)

console.log(mostYears)

let allNames = programmers.reduce((currentName, nextName) => currentName.concat(nextName.name), [])

console.log(allNames)


