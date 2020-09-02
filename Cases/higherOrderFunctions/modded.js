function modded(func) {
    return (...args) => {
        console.log(`Calling with the arguments: ${args}.`)
        let result = func(...args);
        console.log(`Succesfully called with the arguments: ${args}. Result: ${result}`)
        return result
    }
}

modded(Math.max)(67, 6700)