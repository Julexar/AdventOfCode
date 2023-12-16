const fs = require('fs');

function readContraption(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n').map(line => line.trim().split(''));
}

function updateDirection(direction, tile) {
    const directionMap = {
        '→': { '/': '↑', '\\': '↓' },
        '↓': { '/': '←', '\\': '→' },
        '←': { '/': '↓', '\\': '↑' },
        '↑': { '/': '→', '\\': '←' }
    };
    return directionMap[direction] ? directionMap[direction][tile] || direction : direction;
}

function traceBeam(x, y, direction, energized, contraption) {
    const arrowMap = { '→': [0, 1], '←': [0, -1], '↑': [-1, 0], '↓': [1, 0] };
    const validMirrors = new Set(['|←', '|→', '-↑', '-↓']);

    while (x >= 0 && x < contraption.length && y >= 0 && y < contraption[0].length) {
        const tile = contraption[x][y];

        if (['/', '\\'].includes(tile)) {
            direction = updateDirection(direction, tile);
        } else if (['-', '|'].includes(tile) && energized.has(`${x},${y}`)) {
            return energized;
        }

        energized.add(`${x},${y}`);

        if (validMirrors.has(tile + direction)) {
            const newDirections = { '|': [['↑', -1, 0], ['↓', 1, 0]], '-': [['←', 0, -1], ['→', 0, 1]] }[tile];
            for (const [newDirection, dx, dy] of newDirections) {
                traceBeam(x + dx, y + dy, newDirection, energized, contraption);
            }
            return energized;
        }

        const [dx, dy] = arrowMap[direction];
        x += dx;
        y += dy;
    }

    return energized;
}

function findOptimalStart(contraption) {
    const rows = contraption.length;
    const cols = contraption[0].length;
    let maxEnergized = 0;

    for (let y = 0; y < cols; y++) {
        maxEnergized = Math.max(maxEnergized, traceBeam(0, y, '↓', new Set(), contraption).size);
        maxEnergized = Math.max(maxEnergized, traceBeam(rows - 1, y, '↑', new Set(), contraption).size);
    }

    for (let x = 0; x < rows; x++) {
        maxEnergized = Math.max(maxEnergized, traceBeam(x, 0, '→', new Set(), contraption).size);
        maxEnergized = Math.max(maxEnergized, traceBeam(x, cols - 1, '←', new Set(), contraption).size);
    }

    return maxEnergized;
}

const contraption = readContraption("./Floor/text.txt");

const energized = new Set();
traceBeam(0, 0, '→', energized, contraption);
console.log(`Part 1 Solution: ${energized.size}`);

const optimalEnergized = findOptimalStart(contraption);
console.log(`Part 2 Solution: ${optimalEnergized}`);