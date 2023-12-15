const fs = require('fs');
const input = fs.readFileSync("./Library/text.txt", "utf-8").trim().split(',');

let part1Solution = 0;
let part2Solution = 0;

const boxes = Array.from({ length: 256 }, () => []);
const lenses = Array.from({ length: 256 }, () => []);

input.forEach(s => {
    let v = 0;
    for (const c of s) v = (v + c.charCodeAt(0)) * 17 % 256;
    part1Solution += v;

    const id = s.endsWith('-') ? s.slice(0, -1).split('').reduce((acc, c) => (acc + c.charCodeAt(0)) * 17 % 256, 0) : s.slice(0, -2).split('').reduce((acc, c) => (acc + c.charCodeAt(0)) * 17 % 256, 0);

    if (s.endsWith('-')) {
        const index = boxes[id].indexOf(s.slice(0, -1));
        if (index !== -1) {
            boxes[id].splice(index, 1);
            lenses[id].splice(index, 1);
        }
    } else {
        const focal = parseInt(s.slice(-1));
        if (boxes[id].includes(s.slice(0, -2))) {
            const index = boxes[id].indexOf(s.slice(0, -2));
            lenses[id][index] = focal;
        } else {
            boxes[id].push(s.slice(0, -2));
            lenses[id].push(focal);
        }
    }
});

lenses.forEach((l, k) => {
    l.forEach((lense, idx) => {
        part2Solution += (k + 1) * (idx + 1) * lense;
    });
});

console.log("Part 1 Solution:", part1Solution);
console.log("Part 2 Solution:", part2Solution);