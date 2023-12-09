const fs = require('fs');

function parse(input) {
    return input
        .trim()
        .split('\n')
        .map((line) => line.split(' ').map(Number));
}

function extrapolate(nums) {
    const lines = [nums];

    while (!lines[lines.length - 1].every((n) => n === 0)) {
        const prev = lines[lines.length - 1];
        const curr = Array(prev.length - 1);
        for (let i = 1; i < prev.length; i++) {
            curr[i - 1] = prev[i] - prev[i - 1];
        }
        lines.push(curr);
    }

    let right = 0;
    let left = 0;
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        right += line[line.length - 1];
        left = line[0] - left;
    }
    return { left, right };
}

function part1(input) {
    return parse(input).reduce((acc, line) => acc + extrapolate(line).right, 0);
}

function part2(input) {
    return parse(input).reduce((acc, line) => acc + extrapolate(line).left, 0);
}

const input = fs.readFileSync("./Mirage/text.txt", 'utf8');

console.log('Part 1 Solution:', part1(input));
console.log('Part 2 Solution:', part2(input));