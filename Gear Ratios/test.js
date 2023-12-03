const fs = require('fs');

//Part 1

function read(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  return content.split('\n').map(line => line.trim());
}

const numbersRegex = /\d+/g;
const symbolRegex = /[^\.\d]/g;

const lines = read('./Gear\ Ratios/text.txt');
let numbers = [];
let lineMap = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const match of line.matchAll(numbersRegex)) {
    const idx = numbers.length;
    numbers.push(parseInt(match[0], 10));
    for (let j = match.index; j < match.index + match[0].length; j++) {
      lineMap[`${i},${j}`] = idx;
    }
  }
}

const found = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const match of line.matchAll(symbolRegex)) {
    for (let l = i - 1; l <= i + 1; l++) {
      for (let c = match.index - 1; c <= match.index + 1; c++) {
        const key = `${l},${c}`;
        if (lineMap[key] !== undefined) {
          found.add(lineMap[key]);
        }
      }
    }
  }
}

const result = Array.from(found).reduce((sum, index) => sum + numbers[index], 0);
console.log("Part 1 Solution: " + result);

//Part 2
numbers = [];
lineMap = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const match of line.matchAll(numbersRegex)) {
      const idx = numbers.length;
      numbers.push(parseInt(match[0], 10));
      for (let j = match.index; j < match.index + match[0].length; j++) {
        lineMap[`${i},${j}`] = idx;
      }
    }
}
  
let ratio = 0;

for (let i = 0; i < lines.length; i++) {
const line = lines[i];
for (const match of line.matchAll(symbolRegex)) {
    const found = new Set();
    for (let l = i - 1; l <= i + 1; l++) {
        for (let c = match.index - 1; c <= match.index + 1; c++) {
            const key = `${l},${c}`;
            if (lineMap[key] !== undefined) {
                found.add(lineMap[key]);
            }
        }
    }
        if (found.size === 2) {
            const indices = Array.from(found);
            ratio += numbers[indices[0]] * numbers[indices[1]];
        }
    }
}
  
console.log("Part 2 Solution: " + ratio);