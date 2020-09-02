function isEven(number) {
    if (number < 0) number = -number;
    if (number === 0) return true
    else if (number === 1) return false

    return isEven(number - 2)
}

console.log(isEven(Number(prompt('Enter your number to check if it is even of not.'))))