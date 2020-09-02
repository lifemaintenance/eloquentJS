//Accepts selected function as an argument and calls it if selected condition is false.
function unless(condition, thenDo) {
    if (!condition) thenDo();
};

//Accepts selected function as an argument and calls it n times with i-counter as it's argument.
function repeat(n, funcToRepeat) {
    for (let i = 0; i < n; i++) {
        funcToRepeat(i);
    }
};

//Passing 10 as a limit and an anonymous function as an argument 
//Несколько раз вызывается анонимная функци с someArg в роли плейсхолдера для аргумента
//При каждом вызове в этот плейсхолдер подставляется i-счётчик, как это и прописано в функции repeat 
repeat(10, someArg => {
    unless(someArg % 2 == 1, () => {
        console.log(`${someArg} - is even number.`);
    })
});


["A", "B"].forEach(ph => console.log(ph));

var mathy = function (x) {
    return function (y) {
        return function (z) {
            return (x / y) - z;
        }
    }
};

let helloThere = greeting => {
    return name => {
        return `${greeting}, ${name}!`
    }
}

console.log(helloThere('Hiii')('Monica'))

let leftRight = side => {
    return otherSide => [side, otherSide]
}

console.log(leftRight('left')('right'))