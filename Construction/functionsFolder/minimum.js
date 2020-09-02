function min(firstArgument, secondArgument) {
    return firstArgument < secondArgument ? firstArgument : secondArgument
}

console.log(min(Number(prompt('Enter your first argument.')), Number(prompt('Enter your second argument.'))))