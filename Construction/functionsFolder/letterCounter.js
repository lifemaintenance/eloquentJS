function countChar(string, neededChar) {
    let counter = 0;
    for (let cursor = 0; cursor <= string.length - 1; cursor++) {
        if (string[cursor] === String(neededChar)) counter++;
    }
    return counter
}

console.log(`Number of needed characters in your string: ${countChar(prompt(`Enter your string to count the number of needed characters in it.`), prompt('For which character it should check?'))} `)