const fs = require("fs");

const input = fs.readFileSync("./Counter/text.txt", "utf-8").trim();

const mod = (n, m) => ((n % m) + m) % m;

let pos = {};

const DS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const k = (x,y) => x+'_'+y;

let map = input.split("\n").map((line, y) => line.split('').map((v, x) => {
    if (v == 'S') {
        pos[k(x,y)] = [x, y, 1]
        return '.';
    }
    return v;
}))

const diffs = row => row.map((v, i) => v - row[i - 1]).slice(1);
const run = arr => arr.map(step => {
    while (step.some(v => v !== 0)) {
        step = diffs(step);
        arr.push(step);
    }
    return arr.map(v => v[0]);
})

let len = map.length;

const step = pos => {
    let newPos = {};
    Object.values(pos).forEach(([x, y, v]) => {
        DS.forEach(([dx, dy]) => {
            if (map[mod(y+dy, len)][mod(x+dx, len)] == '.') newPos[k(x+dx,y+dy)] = [x+dx, y+dy];
        })
    })
    return newPos
}

let vals = [];
let p1Total;

for (let i = 1; i <= 131*2+65; i++) {
    pos = step(pos);

    if (i == 64) p1Total = Object.keys(pos).length;

    if (i % 131 == 65) {
        vals.push(Object.keys(pos).length);
    }
}

let ks = run([vals])[0];

let steps = (26501365 - 65) / 131;

console.log('Part 1 Solution:', p1Total);

console.log('Part 2 Solution:', ks[0] + ks[1]*steps + steps*(steps-1)*ks[2]/2);