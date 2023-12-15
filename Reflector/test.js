function transpose(data) {
    const transposed = [];
    for (let i = 0; i < data[0].length; i++) {
        let newRow = "";
        for (let j = 0; j < data.length; j++) {
            newRow += data[j][i];
        }
        transposed.push(newRow);
    }
    return transposed;
}

function cycle(data) {
    for (let _ = 0; _ < 4; _++) {
        data = rot90(data.map(rollRow));
    }
    return data;
}

function rot90(data) {
    const rotated = [];
    for (let i = data[0].length - 1; i >= 0; i--) {
        let newRow = "";
        for (let j = 0; j < data[0].length; j++) {
            newRow += data[j][i];
        }
        rotated.push(newRow);
    }
    return rotated;
}

function rollRow(row) {
    let newRow = "";
    let dotCount = 0;
    for (const rock of row) {
        if (rock === ".") {
            dotCount += 1;
        } else if (rock === "O") {
            newRow += "O";
        } else {
            newRow += ".".repeat(dotCount) + "#";
            dotCount = 0;
        }
    }
    return newRow + ".".repeat(dotCount);
}

function countLoad(data) {
    let sum = 0;
    for (const line of data) {
        for (let rockIdx = 0; rockIdx < line.length; rockIdx++) {
            if (line[rockIdx] === "O") {
                sum += line.length - rockIdx;
            }
        }
    }
    return sum;
}

const fs = require('fs');
const input = fs.readFileSync('./Reflector/text.txt', 'utf-8').trim().split('\n');
let data = transpose(input);
const part1Solution = countLoad(data.map(rollRow));
const loops = {};
for (let idx = 0; idx < 1000000000; idx++) {
    const newData = cycle(data);
    if (!(newData in loops)) {
        loops[newData] = idx;
    } else if ((1000000000 - idx) % (loops[newData] - idx) === 0) {
        break;
    }

    data = newData;
}
const part2Solution = countLoad(data)
console.log("Part 1 Solution:", part1Solution);
console.log("Part 2 Solution:", part2Solution);