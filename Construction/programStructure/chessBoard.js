let size = Number(prompt("Enter the size of Chess Board"));
let chessBoardSize = size * size;
let chessBoardString = "";
let whichOne = false;
let cursor = 0;
for (let current = 0; current < chessBoardSize; current++) {
    if (whichOne == false) {
        chessBoardString += " ";
        cursor += 1;
        if (cursor == size) {
            chessBoardString += "\n";
            cursor = 0;
            continue;
        }
        whichOne = !(whichOne);
    } else {
        chessBoardString += "#";
        cursor += 1;
        if (cursor == size) {
            chessBoardString += "\n";
            cursor = 0;
            continue;
        }
        whichOne = !(whichOne);
    }
}
console.log(chessBoardString)