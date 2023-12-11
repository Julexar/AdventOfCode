const fs = require('fs');

const input = fs.readFileSync("./Cosmic/text.txt", 'utf-8').split('\n');
const startingGalaxies = [];
const emptyRows = [];

for (let row = 0; row < input.length; row++) {
    const line = input[row];
    if (!line.includes('#')) {
        emptyRows.push(row);
    }

    for (let col = 0; col < line.length; col++) {
        const c = line[col];
        if (c === '#') {
            startingGalaxies.push({ row, col });
        }
    }
}

const emptyCols = [];
for (let col = 0; col < input[0].length; col++) {
    if (startingGalaxies.every(g => g.col !== col)) {
        emptyCols.push(col);
    }
}

console.log(`Part 1: ${calculateDistances()}`);
console.log(`Part 2: ${calculateDistances(1000000)}`);

function calculateDistances(factor = 2) {
    const galaxies = [...startingGalaxies];

    emptyRows.forEach(emptyRow => {
        for (let i = 0; i < startingGalaxies.length; i++) {
            if (startingGalaxies[i].row > emptyRow) {
                galaxies[i] = { row: galaxies[i].row + factor - 1, col: galaxies[i].col };
            }
        }
    });

    emptyCols.forEach(emptyCol => {
        for (let i = 0; i < startingGalaxies.length; i++) {
            if (startingGalaxies[i].col > emptyCol) {
                galaxies[i] = { row: galaxies[i].row, col: galaxies[i].col + factor - 1 };
            }
        }
    });

    const distances = [];

    const pairs = [];
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            pairs.push({ key: galaxies[i], value: galaxies[j] });
        }
    }

    pairs.forEach(pair => {
        const { row: row1, col: col1 } = pair.key;
        const { row: row2, col: col2 } = pair.value;

        const distance = Math.abs(row1 - row2) + Math.abs(col1 - col2);
        distances.push(distance);
    });

    return distances.reduce((sum, distance) => sum + distance, 0);
}