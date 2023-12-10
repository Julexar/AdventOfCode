const fs = require('fs');

const inputFile = './Maze/text.txt';
const fileContent = fs.readFileSync(inputFile, 'utf-8');
const m = fileContent.trim().split('\n');

const n = {
  "|": [[0, -1], [0, 1]],
  "-": [[-1, 0], [1, 0]],
  "L": [[0, -1], [1, 0]],
  "J": [[0, -1], [-1, 0]],
  "7": [[-1, 0], [0, 1]],
  "F": [[1, 0], [0, 1]],
};

let x, y;

for (let yi = 0; yi < m.length; yi++) {
  for (let xi = 0; xi < m[yi].length; xi++) {
    if (m[yi][xi] === "S") {
      x = xi;
      y = yi;
      break;
    }
  }
}

if (x === undefined || y === undefined) {
  throw new Error("Start position not found!");
}

const q = [];

for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
  const c = m[y + dy][x + dx];
  if (c in n) {
    for (const [dx2, dy2] of n[c]) {
      if (x === x + dx + dx2 && y === y + dy + dy2) {
        q.push([1, [x + dx, y + dy]]);
      }
    }
  }
}

const dists = { [`${x},${y}`]: 0 };

while (q.length > 0) {
  const [d, [x, y]] = q.shift();

  if (dists[`${x},${y}`] !== undefined) {
    continue;
  }

  dists[`${x},${y}`] = d;

  for (const [dx, dy] of n[m[y][x]]) {
    q.push([d + 1, [x + dx, y + dy]]);
  }
}

const w = m[0].length;
const h = m.length;

let insideCount = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (dists[`${x},${y}`] !== undefined) {
      continue;
    }

    let crosses = 0;
    let x2 = x;
    let y2 = y;

    while (x2 < w && y2 < h) {
      const c2 = m[y2][x2];
      if (dists[`${x2},${y2}`] !== undefined && c2 !== "L" && c2 !== "7") {
        crosses += 1;
      }
      x2 += 1;
      y2 += 1;
    }

    if (crosses % 2 === 1) {
      insideCount += 1;
    }
  }
}

console.log(`Part 1: ${Math.max(...Object.values(dists))}`);
console.log(`Part 2: ${insideCount}`);